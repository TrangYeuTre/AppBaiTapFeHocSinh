import axios from "axios";

//FIXME: deploy app rồi test thử , nếu ok thì comment out hết

export default function TestCookie() {
  const axiosInstance = axios.create({ withCredentials: true });
  const getCookie = async () => {
    const fetchUrl = "http://localhost:8080/api/v1/get-cookie";
    try {
      const response = await axiosInstance.get(fetchUrl);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const sendReqWithCookie = async () => {
    const fetchUrl = "http://localhost:8080/api/v1/read-cookie";
    try {
      const response = await axiosInstance.post(fetchUrl);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <button className="btn-shape btn-shape-submit" onClick={getCookie}>
        Test lấy cookie
      </button>
      <button
        className="btn-shape btn-shape-submit"
        onClick={sendReqWithCookie}
      >
        Test gởi yêu cầu kèm cookie
      </button>
    </>
  );
}
