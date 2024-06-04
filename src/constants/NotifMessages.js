import NotifTypes from "./NotifTypes";
export const NotifMessages = Object.freeze({
  Login: {
    NoToken: {
      text: "مدت احراز هویت شما به پایان رسیده",
      type: NotifTypes.Warning,
    },
    Success: {
      text: "با موفقیت وارد شدید ، درحال انتقال...",
      type: NotifTypes.Success,
    },
    Error: { text: "نام کاربری یا رمز عبور نامعتبر", type: NotifTypes.Error },
  },
  Project: {
    ChangeStatus: { text: "با موفقیت تغییر یافت", type: NotifTypes.Success },
    SuccessAdd: {
      text: "باموفقیت اضافه شد ، درحال رفرش صفحه...",
      type: NotifTypes.Success,
    },
    FailedAdd: {
      text: "خطایی رخ داد دوباره تلاش کنید ، درحال رفرش صفحه...",
      type: NotifTypes.Error,
    },
    Success: { text: "درخواست با موفقیت ارسال شد", type: NotifTypes.Success },
    Error: {
      Default: { text: "درخواست اخذ با خطا مواجه شد", type: NotifTypes.Error },
      EmptyOrWrongSUID: {
        text: "شماره های دانشجویی وارد نشده یا اشتباه است",
        type: NotifTypes.Error,
      },
    },
  },
});

export default NotifMessages;
