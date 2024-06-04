import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function SupervisorRequestModal({
  buttonContent,
  header,
  content,
  id = null,
  participants = null,
  buttonClassName = null,
  changeHandeler = null,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={handleClickOpen}
        className={
          buttonClassName ||
          "text-xs px-2 py-1 text-white rounded-lg mx-3 bg-slate-500"
        }>
        {buttonContent}
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          <button
            className="text-xs px-2 pb-4 text-slate-500"
            onClick={handleClose}>
            بستن
          </button>
          <p className="text-lg">{header}</p>
        </DialogTitle>
        <DialogContent>
          {participants && (
            <>
              <p>اعضا : </p>
              {participants.map(({ name, suid }) => (
                <input
                  disabled={true}
                  key={suid}
                  value={`نام : ${name} ، شماره دانشجویی:${suid}`}
                  className="border-2 border-slate-600 rounded-lg w-[100%] my-1 p-1 text-xs"
                />
              ))}
            </>
          )}
          <p id="alert-dialog-description" className="text-sm">
            {content}
          </p>
        </DialogContent>
        <DialogActions>
          <button
            className="text-sm px-2 py-1 text-slate-500 rounded-lg  border-slate-500 border-2"
            onClick={() => {
              handleClose();
              changeHandeler(id, false, participants);
            }}>
            رد درخواست
          </button>
          <button
            className="text-sm px-2 py-1 text-white rounded-lg mx-3 bg-slate-500"
            onClick={() => {
              handleClose();
              changeHandeler(id, true, participants);
            }}
            autoFocus>
            تایید درخواست
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
