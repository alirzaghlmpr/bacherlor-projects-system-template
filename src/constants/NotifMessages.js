import NotifTypes from "./NotifTypes";
export const NotifMessages = Object.freeze({
  Login: {
    Success: { text: "با موفقیت وارد شدید", type: NotifTypes.Success },
    Error: { text: "نام کاربری یا رمز عبور نامعتبر", type: NotifTypes.Error },
  },
  Project: {
    Success: { text: "با موفقیت اخذ شد", type: NotifTypes.Success },
    Error: { text: "درخواست اخذ با خطا مواجه شد", type: NotifTypes.Error },
  },
});

export default NotifMessages;
