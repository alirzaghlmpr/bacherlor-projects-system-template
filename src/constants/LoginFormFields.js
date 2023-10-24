const username = "username";
const password = "password";

export const LoginFormField = Object.freeze({
  [username]: {
    label: "شناسه کاربری",
    key: "username",
    error: "شناسه کاربری نمیتواند خالی باشد",
    type: "text",
    autoComplete: "username",
  },
  [password]: {
    label: "رمز عبور",
    key: "password",
    error: "رمز عبور نمیتواند خالی باشد",
    type: "password",
    autoComplete: "current-password",
  },
});

export const LoginFormKeys = [username, password];
