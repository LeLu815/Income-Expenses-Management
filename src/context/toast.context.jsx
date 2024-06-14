import { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TOAST_TYPE_SUCCESS = "success";
export const TOAST_TYPE_INFO = "info";
export const TOAST_TYPE_WARNING = "warning";
export const TOAST_TYPE_ERROR = "error";

const ToastContext = createContext({
  openToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const value = {
    openToast: ({ type, title }) => {
      toast[type](title, { theme: "colored" });
    },
  };
  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={2500} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        theme="light"
      />
    </ToastContext.Provider>
  );
};

export const useCustomToast = () => useContext(ToastContext);
