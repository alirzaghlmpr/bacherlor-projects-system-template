import { LoginFormField } from "../../../constants/LoginFormFields";
import LoginLayout from "../../layouts/LoginLayout";
import LOGO from "../../../assets/images/university-logo.png";

import Swal from "sweetalert2";
import { useState } from "react";
import checkEmptyOrNull from "../../../utils/checkEmptyOrNull";
import BounceLoader from "react-spinners/BounceLoader";

const LoginForm = () => {
  const [status, setPageStatus] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    username: false,
    password: false,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formElements = e.target?.elements;

    let username = formElements[LoginFormField.Username.key]?.value;
    let password = formElements[LoginFormField.Password.key]?.value;

    setInputErrors({
      username: checkEmptyOrNull(username),
      password: checkEmptyOrNull(password),
    });
  };

  return (
    <LoginLayout>
      <div className="bg-slate-500 md:order-1 order-2 flex flex-col items-center justify-center">
        <h1 className="mb-10 font-bold text-slate-50">
          سامانه اخذ پروژه کارشناسی
        </h1>

        <form onSubmit={handleFormSubmit} className="flex w-[50%] flex-col gap-10">
          <div>
            <label
              htmlFor={LoginFormField.Username.key}
              className="block mb-2 text-sm text-slate-50">
              {LoginFormField.Username.label}
            </label>
            <input
              type="text"
              className={`outline-none rounded-lg w-[100%] p-2 focus:${
                inputErrors.username === true
                  ? "border-red-600"
                  : "border-slate-800"
              } border-2 ${
                inputErrors.username === true
                  ? "border-red-600"
                  : "border-transparent"
              }`}
              id={LoginFormField.Username.key}
            />
            {inputErrors.username && (
              <span className="text-xs text-red-200">
                {LoginFormField.Username.error}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor={LoginFormField.Password.key}
              className="block mb-2 text-sm text-slate-50">
              {LoginFormField.Password.label}
            </label>
            <input
              type="text"
              className={`outline-none rounded-lg w-[100%] p-2 focus:${
                inputErrors.password === true
                  ? "border-red-600"
                  : "border-slate-800"
              } border-2 ${
                inputErrors.password === true
                  ? "border-red-600"
                  : "border-transparent"
              }`}
              id={LoginFormField.Password.key}
            />
            {inputErrors.password && (
              <span className="text-xs text-red-200">
                {LoginFormField.Password.error}
              </span>
            )}
          </div>
          <button
            className={`bg-slate-50 border-none outline-none rounded-lg items-center flex justify-center w-[100%] p-2 gap-5`}>
            <span>{status ? "درحال ورود" : "ورود"}</span>
            {status ? <BounceLoader size="20" /> : ""}
          </button>
        </form>
      </div>
      <div className="bg-gray-50 flex items-center justify-center md:order-2 order-1">
        <img src={LOGO} className="w-[40%]" alt="" />
      </div>
    </LoginLayout>
  );
};

export default LoginForm;
