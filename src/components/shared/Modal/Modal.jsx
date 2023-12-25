import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Modal({
  buttonContent,
  header,
  content,
  id = null,
  capacity = null,
  buttonClassName = null,
  acceptHandeler = null,
}) {
  const [students, setParticipants] = useState(
    Array.from({ length: capacity }, (_, key) => ({ key, text: "" }))
  );

  const handleChange = (e, id) =>
    setParticipants(
      students.map((student, index) =>
        index === id ? { ...student, text: e.target.value } : student
      )
    );

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
          <p className="text-lg">{header}</p>
        </DialogTitle>
        <DialogContent>
          {students &&
            students.map(({ key }) => (
              <input
                key={key}
                placeholder={`شماره دانشجویی همگروهی شماره ${key + 1}`}
                onChange={(e) => handleChange(e, key)}
                className="border-2 border-slate-600 rounded-lg w-[80%] my-1 p-1 text-sm"></input>
            ))}
          <p id="alert-dialog-description" className="text-sm">
            {content}
          </p>
        </DialogContent>
        <DialogActions>
          <button
            className="text-sm px-2 py-1 text-slate-500 rounded-lg  border-slate-500 border-2"
            onClick={handleClose}>
            رد
          </button>
          <button
            className="text-sm px-2 py-1 text-white rounded-lg mx-3 bg-slate-500"
            onClick={() => {
              handleClose();
              acceptHandeler(id, students);
            }}
            autoFocus>
            تایید
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
