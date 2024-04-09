import Card from "../UI/Card";
import ExerciseGroup from "./ExerciseGroup";
import { useAxiosInstance } from "../../hooks/useHooks";
import { useState } from "react";
import { submitAnswers } from "../../helper/axiosApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function ExerciseManage({ username, hocSinh }) {
  const homeworks = useSelector((state) => state.hws.hws);
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();

  console.log("---hws hiện tại");
  console.log(homeworks);

  //State quyết định có cho xem bài làm đã lưu của học sinh hay không
  //FIXME: để true để luôn bật để build tính năng, xong thì chuyển nó về false
  const [xemBaiDaLam, setXemBaiDaLam] = useState(true);

  //State quản lý thông báo lỗi nội bộ luôn
  const [error, setError] = useState({
    init: true,
    message: "",
  });
  console.log(error);
  //Quan trọng : thằng homeworks này sẽ dùng làm khuôn để fetch update nộp bài tập luôn nhé
  if (!homeworks || homeworks.length === 0)
    return (
      <Card plusStyle="w-1/2">
        <p>Chưa có bài tập được giao 😎😎😎</p>
      </Card>
    );
  const axiosInstance = useAxiosInstance(token);

  //Ở đây là bước trung gian ta phải xử lý chuyển hóa data homeworks về 1 mảng bài tập
  // tiện cho việc render.
  //Mỗi item trong homeworks có start,end -> ko cần thiết vì từ BE ta đã xử lý lấy về các items còn tỏng hạn rồi
  const handler = [];
  homeworks.forEach((item) => {
    item.baiTapVeNha.forEach((i) =>
      handler.push({ ...i, baiTapLonId: item._id, soLanNop: i.soLanNop })
    );
  });
  //Nộp bài chung đây
  const nopBaiHandler = async () => {
    //Ok quăng nguyên mảng bài tập này lên để BE xử lý update thôi
    const validSubmit = checkValidSubmit({ homeworks, setError });
    if (validSubmit) {
      await submitAnswers({ hws: homeworks, axiosInstance, hocSinh, router });
    }
  };
  return (
    <section className="content-wrapper">
      <p>Học sinh: {username}</p>
      <div className="flex flex-row flex-1 gap-3">
        <p>{xemBaiDaLam ? "Ẩn bài đã làm" : "Xem lại bài đã làm"}</p>
        <button
          type="button"
          className="btn btn-main w-fit mx-0"
          onClick={() => {
            setXemBaiDaLam((preState) => !preState);
          }}
        >
          {xemBaiDaLam ? "Ẩn" : "Xem "}
        </button>
      </div>
      <ul className="list-none flex flex-1 flex-col gap-10 mt-8 ">
        {handler.length > 0 &&
          handler.map((hw) => (
            <>
              <hr />
              <ExerciseGroup
                key={"Hello" + Math.random().toString()}
                hw={hw}
                xemBaiDaLam={xemBaiDaLam}
              />
            </>
          ))}
      </ul>
      <hr className="my-6" />
      {!error.init && error.message && (
        <div className="flex flex-col justify-center items-center gap bg-coRed opacity-80 p-4 gap-3 rounded-xl">
          <label className="text-coWhite font-bold">Lỗi ⚠️⚠️⚠️</label>
          <p className="text-coWhite ">{error.message}</p>
        </div>
      )}

      <button className="btn btn-submit my-6" onClick={nopBaiHandler}>
        <p className="uppercase font-bold">Nộp bài</p>
      </button>
    </section>
  );
}

function checkValidSubmit({ homeworks, setError }) {
  if (!homeworks || homeworks.length === 0) return false;
  //Th0: nếu tất cả bài tập đều hết lần nộp thì dis
  let result = true;
  let validSubmit = false;
  // console.log(homeworks);
  for (let i = 0; i < homeworks.length; i++) {
    const curHw = homeworks[i];
    const curBaiTapVeNha = curHw.baiTapVeNha;
    for (let j = 0; j < curBaiTapVeNha.length; j++) {
      const curBtvn = curBaiTapVeNha[j];
      //Hễ còn 1 bài tập còn có thể nộp thì vẫn cho nộp
      //Những bài tập còn lại khi submit lên BE đã có logic loại ra rồi
      if (+curBtvn.soLanNop < 3) validSubmit = true;
      //Th1: baiLamHocSinh rỗng
      if (curBtvn.baiLamCuaHocSinh.length === 0) {
        // console.log("Form không hợp lệ -> baiLamCuaHocSinh rỗng");
        // result = false;
        setError({ message: "Làm chưa đủ bài tập.", init: false });
        result = false;
        break;
      }
      //Th2: khi phần trả lời bị sửa lại hoặc bị rỗng
      curBtvn.baiLamCuaHocSinh.forEach((bai) => {
        if (!bai.content) {
          // result = false;
          // console.log("Form không hợp lệ -> một content nào đó rỗng");
          setError({ message: "Thiếu một bài tập chưa làm.", init: false });
          result = false;
        }
      });
      //Th3: kiểm cho từng dạng bài
      if (curBtvn.data.viet.active) {
        const soLuongBaiHsLam = +curBtvn.baiLamCuaHocSinh.length;
        const soLuongBaiThuc = +curBtvn.data.viet.datas.length;
        if (soLuongBaiHsLam < soLuongBaiThuc) {
          setError({ message: "Làm thiếu bài dạng viết.", init: false });
          result = false;
          break;
        }
        curBtvn.baiLamCuaHocSinh.forEach((baiLam) => {
          if (!baiLam.content) {
            setError({ message: "Làm thiếu bài dạng viết.", init: false });
            result = false;
          }
        });
      }
      if (curBtvn.data.tracNghiem.active) {
        if (curBtvn.baiLamCuaHocSinh.length !== 1) {
          setError({ message: "Làm thiếu bài dạng trắc nghiệm.", init: false });
          result = false;
        }
      }
      if (curBtvn.data.dienKhuyet.active) {
        const soLuongBaiHsLam = +curBtvn.baiLamCuaHocSinh.length;
        const soLuongBaiThuc = +curBtvn.data.dienKhuyet.datas.length;
        if (soLuongBaiHsLam < soLuongBaiThuc) {
          setError({ message: "Làm thiếu bài dạng điền khuyết.", init: false });
          result = false;
          break;
        }
        curBtvn.baiLamCuaHocSinh.forEach((baiLam) => {
          if (!baiLam.content) {
            setError({
              message: "Làm thiếu bài dạng điền khuyết.",
              init: false,
            });
            result = false;
          }
        });
      }
      if (curBtvn.data.matching.active) {
        const soLuongBaiHsLam = +curBtvn.baiLamCuaHocSinh.length;
        const soLuongBaiThuc = +curBtvn.data.matching.datas.itemsTrai.length;
        if (soLuongBaiHsLam < soLuongBaiThuc) {
          setError({ message: "Làm thiếu bài dạng matching.", init: false });
          result = false;
          break;
        }
      }
    }
  }
  if (!validSubmit) {
    setError({
      message: "Tất cả các bài tập đã hết lượt làm bài.",
      init: false,
    });
    result = false;
  }
  //Nếu pass hết thì true thôi
  if (result) {
    setError({ message: "", init: false });
  }
  return result;
}
