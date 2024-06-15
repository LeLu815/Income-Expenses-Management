import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { produce } from "immer";
import { createContext, forwardRef, useContext, useRef, useState } from "react";

export const TYPE_SUCCESS = "success";
export const TYPE_INFO = "info";
export const TYPE_WARNING = "warning";
export const TYPE_ERROR = "error";

const initialState = {
  title: "",
  description: "",
  button: "",
  isShow: false,
  type: TYPE_SUCCESS,
};
const AlertContext = createContext({
  openModal: () => {},
  closeModal: () => {},
  confirm: false,
});
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AlertProvider = ({ children }) => {
  const [alertData, setAlertData] = useState(initialState);
  const [confrim, setConfirm] = useState(false);
  const confrimRef = useRef(null);
  confrimRef.current = false;

  const value = {
    openModal: ({ title, description, button = false }) => {
      setConfirm(false);
      setAlertData({
        title,
        description,
        button,
        isShow: true,
      });
    },
    closeModal: () => {
      setAlertData((prevState) =>
        produce(prevState, (draft) => {
          draft.isShow = false;
        })
      );
    },
    confirm: confrim,
    setConfirm,
  };

  const handleClose = () => {
    setAlertData((prevState) =>
      produce(prevState, (draft) => {
        draft.isShow = false;
      })
    );
  };
  const handleConfirm = () => {
    setConfirm(true);
    handleClose();
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      <Dialog
        onClose={handleClose}
        open={alertData ? alertData.isShow : false}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="px-8 py-3">
          <DialogTitle id="alert-dialog-title">{alertData.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {alertData.description}
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            {alertData.button && (
              <Button variant="outlined" onClick={handleConfirm}>
                {alertData.button}
              </Button>
            )}
          </DialogActions>
        </div>
      </Dialog>
    </AlertContext.Provider>
  );
};

export const useCustomModal = () => useContext(AlertContext);
