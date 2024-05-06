import Card from "../UI/Card";
import CardHomework from "../UI/CardHomework";
import LoadImageFailMessage from "../UI/LoadImageFailMessage";
import BlockContentBar from "../UI/BlockContentBar";
import ImagePreview from "../UI/ImagePreview";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";
import { HwsRenderActions } from "../../store/hwsRenderSlice";
import { manipulateWithLocalStorage } from "../../helper/uti";
import Status from "./Status";
import AutoResizeTextarea from "./AutoHeightTextarea";
import Image from "next/image";
import HomeworkActionsBar from "./HomeworkActionsBar";

export default function HomeworkTypeMatching({
  homeworkData,
  validSubmit,
  hocSinh,
}) {
  const { renderDatas } = homeworkData;
  const dispatch = useDispatch();
  const updatingStore = useSelector((state) => state.hws.updatingStore);
  const blockHomework = useMemo(() => {
    return homeworkData.soLanNop >= 3;
  }, [homeworkData]);

  const [studentDo, setStudentDo] = useState(false);
  const [localError, setLocalErorr] = useState("");
  const [itemsTrai, setItemsTrai] = useState([]);
  const [itemsPhai, setItemsPhai] = useState([]);

  useEffect(() => {
    setItemsTrai(renderDatas.itemsTrai);
    setItemsPhai(renderDatas.itemsPhaiRandom);
  }, [renderDatas]);

  //Đọc localStorage và điền,load 1 lần ko dependencies
  useEffect(() => {
    setItemsTrai((preState) => {
      const cloneItemsTrai = JSON.parse(JSON.stringify([...preState]));
      cloneItemsTrai.forEach((itemTrai) => {
        const nhanChonLocalStorage = manipulateWithLocalStorage({
          order: "get",
          idBaiTap: itemTrai.idVeTrai,
        });
        const targetOption = itemTrai.options.find(
          (option) => option.nhan === nhanChonLocalStorage
        );
        if (targetOption) targetOption.isSelected = true;
      });
      return cloneItemsTrai;
    });
  }, [renderDatas]);

  //Kiểm tra làm đủ thì kích hoạt nút nhảy
  useEffect(() => {
    if (checkDoAll()) {
      setStudentDo(true);
    } else {
      setStudentDo(false);
    }
  }, [itemsTrai]);

  const checkDoAll = () => {
    const totalItemsTrai = itemsTrai.length;
    let countSelected = 0;
    itemsTrai.forEach((item) => {
      item.options.forEach((option) => {
        if (option.isSelected) countSelected++;
      });
    });
    return totalItemsTrai === countSelected;
  };

  const selectOption = ({ idVeTrai, nhanChon, veTrai }) => {
    setItemsTrai((preState) => {
      const cloneItemsTrai = JSON.parse(JSON.stringify([...preState]));

      const targetItemTrai = cloneItemsTrai.find(
        (itemTrai) => itemTrai.idVeTrai === idVeTrai
      );
      if (!targetItemTrai) return cloneItemsTrai;

      targetItemTrai.options.forEach((option) => (option.isSelected = false));

      const targetOption = targetItemTrai.options.find(
        (option) => option.nhan === nhanChon
      );
      if (targetOption) targetOption.isSelected = true;
      return cloneItemsTrai;
    });
  };

  const layDapAnCuaHocSinh = () => {
    //1. Thiếu một câu chưa chọn thì ném lỗi ở đây
    const doAll = checkDoAll();
    if (!doAll) {
      setLocalErorr("Thiếu một bài tập chưa chọn đáp án.");
      setTimeout(() => {
        const errorElement = document.getElementById(
          `local-error-message-matching-${homeworkData.idBaiTapCon}`
        );
        if (errorElement) errorElement.scrollIntoView({ behavior: "smooth" });
      }, 100);

      return;
    } else {
      setLocalErorr("");
    }
    //2. Xử lý tổng hợp lấy data submit luôn
    const baiLamCuaHocSinh = itemsTrai.map((itemTrai) => {
      const id = itemTrai.idVeTrai;
      const selectedOption = itemTrai.options.find(
        (option) => option.isSelected
      );
      const content = selectedOption ? selectedOption.nhan : "";
      return {
        id,
        content,
        type: "matching",
      };
    });
    dispatch(
      HwsActions.updateAnswersMatching({
        idBaiTapVeNhaCon: homeworkData.idBaiTapVeNhaCon,
        baiLamCuaHocSinh,
      })
    );

    if (!updatingStore) {
      baiLamCuaHocSinh.forEach((baiLam) => {
        manipulateWithLocalStorage({
          order: "set",
          idBaiTap: baiLam.id,
          content: baiLam.content,
        });
      });
    }
    if (!updatingStore) {
      dispatch(HwsRenderActions.increaseLoadOrdinalNumber());
    }
  };

  return (
    <CardHomework>
      {validSubmit && (
        <div className="homework-all-done-wrapper">
          <p>Chúc mừng bé đã làm hết bài tập. 🎉🎉🎉</p>
          <p>Nhớ bấm nút NỘP BÀI bên dưới để cô Trang chấm bài nhé</p>
        </div>
      )}
      {!validSubmit && (
        <div className={blockHomework ? "disabled-homework-card" : null}>
          <AutoResizeTextarea
            inputValue={`Đề bài: ${renderDatas.deBai || null}`}
            ordinalNumber={homeworkData.ordinalNumber || ""}
          />
          <hr className="line-gray" />

          <Status tinhTrang={renderDatas.tinhTrang} />
          {localError && (
            <p
              id={`local-error-message-matching-${homeworkData.idBaiTapCon}`}
              className="error-text"
            >
              {localError}
            </p>
          )}

          <hr className="line-gray" />
          <div className="card-homework-student-work-wrapper">
            <div className="matching-grid">
              {/* VẾ TRÁI */}
              <VeTrai itemsTrai={itemsTrai} selectOption={selectOption} />
              {/* VẾ PHẢI */}
              <VePhai itemsPhai={itemsPhai} />
            </div>
          </div>

          {blockHomework && <BlockContentBar />}
        </div>
      )}

      <HomeworkActionsBar
        doAction1={layDapAnCuaHocSinh}
        pulseButton={studentDo}
        isLoading={updatingStore}
        validSubmit={validSubmit}
        hocSinh={hocSinh}
      />
    </CardHomework>
  );
}
const VeTrai = ({ itemsTrai, selectOption }) => {
  return (
    <div className="matching-grid-equal-wrapper">
      {itemsTrai.length > 0 &&
        itemsTrai.map((iTrai) => (
          <div key={iTrai.idVeTrai} className="matching-grid-left-item">
            {iTrai.hinhTrai && (
              <Image
                src={iTrai.hinhTrai}
                alt="hình minh họa"
                height={80}
                width={80}
              />
            )}
            <div className="flex flex-col flex-wrap gap-3">
              <p>{iTrai.veTrai}</p>
              <div className="flex flex-row flex-wrap gap-2">
                {iTrai.options.length > 0 &&
                  iTrai.options.map((opt) => (
                    <div
                      key={Math.random().toString() + opt.nhan}
                      className={
                        opt.isSelected
                          ? "option-item-selected !w-fit"
                          : "option-item !w-fit"
                      }
                      onClick={selectOption.bind(this, {
                        idVeTrai: iTrai.idVeTrai,
                        nhanChon: opt.nhan,
                        veTrai: iTrai.veTrai,
                      })}
                    >
                      {opt.nhan}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

const VePhai = ({ itemsPhai }) => {
  return (
    <div className="matching-grid-equal-wrapper">
      {itemsPhai.length > 0 &&
        itemsPhai.map((iPhai) => (
          <div key={iPhai.idVePhai} className="matching-grid-right-item">
            {/* <div className="flex flex-row gap-2 border-2 h-full border-coBlue2 rounded-xl overflow-hidden"> */}
            {/* Nhãn bự cho vế phải */}
            <div className="matching-grid-right-label-wrapper">
              <p className="matching-grid-right-label">{iPhai.nhan}</p>
            </div>
            {/* Phần text mô tả và hình */}
            <div className="flex flex-col gap-2 p-3 w-full">
              <p className="font-semibold">{iPhai.vePhai}</p>
              <div className="matching-grid-right-image-wrapper">
                {iPhai.hinhPhai && (
                  <div
                    className="w-full relative
                  h-[120px] lg:h-[150px]"
                  >
                    <Image
                      src={iPhai.hinhPhai}
                      alt="Hình minh họa bài tập matching"
                      fill={true}
                      objectFit="contain"
                      objectPosition="center"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          // </div>
        ))}
    </div>
  );
};
