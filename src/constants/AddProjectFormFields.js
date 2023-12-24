const title = "title";
const capacity = "capacity";

export const AddProjectFormFields = Object.freeze({
  [title]: {
    label: "عنوان پروژه",
    key: "title",
    error: "عنوان پروژه نمیتواند خالی باشد",
    type: "text",
    autoComplete: "auto",
  },
  [capacity]: {
    label: "ظرفیت",
    key: "capacity",
    error: "ظرفیت پروژه نمیتواند خالی باشد",
    type: "number",
    autoComplete: "auto",
    min: 1,
  },
});

export const AddProjectFormKeys = [title, capacity];
