import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { produce } from "immer";
import { createContext, useContext, useState } from "react";

export const TYPE_SUCCESS = "success";
export const TYPE_INFO = "info";
export const TYPE_WARNING = "warning";
export const TYPE_ERROR = "error";

const initialState = {
  title: "",
  description: "",
  isShow: false,
  type: TYPE_SUCCESS,
};
const AlertContext = createContext({
  openModal: () => {},
  closeModal: () => {},
});

export const AlertProvider = ({ children }) => {
  const [alertData, setAlertData] = useState(initialState);

  const value = {
    openModal: ({ type, title, description }) => {
      setAlertData({
        title,
        description,
        isShow: true,
        type,
      });
    },
    closeModal: () => {
      setAlertData((prevState) =>
        produce((prevState, draft) => (draft.isShow = false))
      );
    },
  };

  const handleClick = () => {
    setAlertData((prevState) =>
      produce((prevState, draft) => (draft.isShow = false))
    );
  };
  return (
    <AlertContext.Provider value={value}>
      {children}
      <div className="fixed top-12 right-7" onClick={handleClick}>
        {alertData.isShow && (
          <Alert severity={alertData.type}>
            <AlertTitle>{alertData.title}</AlertTitle>
            {alertData.description}
          </Alert>
        )}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
