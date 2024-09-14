import staticData from "../data/static.json";
const enviroment = process.env.NODE_ENV;
const API_HOCSINH =
  enviroment === "development"
    ? staticData.API_HOCSINH_DEV
    : staticData.API_HOCSINH;

export default class Subscription {
  constructor({ username, token, exercises = [], loadedExerciseIndex = 0 }) {
    this.username = username;
    this.token = token;
    this.exercises = exercises;
    this.loadedExerciseIndex = loadedExerciseIndex;
  }

  //Fetching load bài tập theo query
  async loadExercises({ axiosInstance, mainQuery, childQuery }) {
    if (!axiosInstance) return;
    const fetchUrl = API_HOCSINH + "/subscriptionAuth/exercises";
    const response = await axiosInstance.post(fetchUrl, {
      main: mainQuery,
      child: childQuery,
    });
    //FIXME: tạm thời loại 2 dạng viết, matching vì chưa làm, làm rồi thì bỏ bước này
    const temporary = response.data.data.data.filter(
      (item) => item.phanLoai !== "viet" && item.phanLoai !== "matching"
    );
    this.exercises = temporary;
    // this.exercises = response.data.data.data;
    return this;
  }

  //Fetching load bài tập demo
  async loadDemoExercises({ axios, mainQuery, childQuery }) {
    if (!axios) return;
    const fetchUrl = API_HOCSINH + "/demo/exercises";
    const response = await axios.post(fetchUrl, {
      main: mainQuery,
      child: childQuery,
    });
    //FIXME: tạm thời loại 2 dạng viết, matching vì chưa làm, làm rồi thì bỏ bước này
    const temporary = response.data.data.data.filter(
      (item) => item.phanLoai !== "viet" && item.phanLoai !== "matching"
    );
    this.exercises = temporary;
    return this;
  }

  //Fetching load bài tập theo query
  async loadRedoExercises({ axiosInstance }) {
    if (!axiosInstance) return;
    const fetchUrl = API_HOCSINH + "/subscriptionAuth/redoExercises";
    const response = await axiosInstance.get(fetchUrl);
    this.exercises = response.data.data.data;
    return this;
  }

  //Cập nhật thành tích
  async updateArchivements({ axiosInstance, dataSubmit }) {
    if (!axiosInstance) return;
    const fetchUrl = API_HOCSINH + "/subscriptionAuth/archivements";
    const response = await axiosInstance.put(fetchUrl, dataSubmit);
    return response.status;
  }

  //Cập nhật bài tập củng cố
  async updateRedoExercises({ axiosInstance, dataSubmit }) {
    if (!axiosInstance) return;
    const fetchUrl = API_HOCSINH + "/subscriptionAuth/redoExercises";
    const response = await axiosInstance.put(fetchUrl, dataSubmit);
    return response.status;
  }

  increaseExerciseIndex() {
    if (this.loadedExerciseIndex === this.exercises.length - 1) {
      return this;
    }
    this.loadedExerciseIndex++;
    return this;
  }

  isEmptyExercises() {
    return this.exercises.length === 0;
  }

  getExerciseByCurrentIndex() {
    if (this.exercises.length === 0) return {};
    return this.exercises[this.loadedExerciseIndex];
  }

  getCurrentExerciseIndex() {
    return this.loadedExerciseIndex;
  }

  getExercisesLength() {
    return this.exercises.length;
  }
}
