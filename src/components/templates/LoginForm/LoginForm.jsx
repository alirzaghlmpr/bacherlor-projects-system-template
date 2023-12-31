import { useEffect, useState } from "react";

import {
  LoginFormField,
  LoginFormKeys,
} from "../../../constants/LoginFormFields";

import sendNotif from "../../../utils/sendNotif";
import checkEmptyOrNull from "../../../utils/checkEmptyOrNull";

import LoginLayout from "../../layouts/LoginLayout";
import Spinner from "../../shared/Spinner";

import PageStatus from "../../../constants/PageStatus";
import NotifMessages from "../../../constants/NotifMessages";

import LOGO from "../../../assets/images/university-logo.png";
import useUserStore from "../../../store/useUserStore";
import { shallow } from "zustand/shallow";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const navigate = useNavigate();

  const { setUserInfo, token, role } = useUserStore(
    (state) => ({
      setUserInfo: state?.setUserInfo,
      token: state?.token,
      role: state?.role,
    }),
    shallow
  );

  useEffect(() => {
    if (token) {
      role === "student" ? navigate("/dashboard") : navigate("/panel");
    }
  }, [role]);

  const [data, setData] = useState({ status: PageStatus.Init, data: null });
  const [inputErrors, setInputErrors] = useState({
    username: false,
    password: false,
  });

  const requestLogin = async (username, password) => {
    setData((prev) => ({
      ...prev,
      data: { username: username, password: password },
    }));

    if (
      (username === "user" && password === "user") ||
      (username === "supervisor" && password === "supervisor")
    ) {
      setData((prev) => ({
        ...prev,
        status: PageStatus.Loading,
      }));

      setTimeout(() => {
        sendNotif(
          NotifMessages.Login.Success.text,
          NotifMessages.Login.Success.type
        );
        setData((prev) => ({
          ...prev,
          status: PageStatus.Fetched,
        }));
      }, 2000);

      setTimeout(() => {
        username === "user"
          ? setUserInfo({
              firstName: "علیرضا",
              lastName: "غلامپور",
              suid: "123456789",
              token: "token",
              role: "student",
            })
          : setUserInfo({
              firstName: "علیرضا",
              lastName: "غلامپور",
              suid: "123456780",
              token: "token",
              role: "supervisor",
            });
      }, 3000);
    } else {
      setData((prev) => ({
        ...prev,
        status: PageStatus.Loading,
      }));

      setTimeout(() => {
        sendNotif(
          NotifMessages.Login.Error.text,
          NotifMessages.Login.Error.type
        );
        setData((prev) => ({
          ...prev,
          status: PageStatus.Fetched,
        }));
      }, 2000);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formElements = e.target?.elements;

    let username = formElements[LoginFormField.username.key]?.value;
    let password = formElements[LoginFormField.password.key]?.value;

    let usernameStatus = checkEmptyOrNull(username);
    let passwordStatus = checkEmptyOrNull(password);

    setInputErrors({
      username: usernameStatus,
      password: passwordStatus,
    });

    if (usernameStatus || passwordStatus) return;
    else await requestLogin(username, password);
  };

  return (
    <LoginLayout>
      <div className="bg-slate-500 md:order-1 order-2 flex flex-col items-center justify-center">
        <h1 className="mb-10 font-bold text-slate-50">
          سامانه اخذ پروژه کارشناسی
        </h1>

        <form
          autoComplete="on"
          onSubmit={handleFormSubmit}
          className="flex w-[50%] flex-col gap-10">
          {LoginFormKeys.map((key) => (
            <div key={key}>
              <label
                htmlFor={LoginFormField[key].key}
                className="block mb-2 text-sm text-slate-50">
                {LoginFormField[key].label}
              </label>
              <input
                name={LoginFormField[key].key}
                id={LoginFormField[key].key}
                autoComplete={LoginFormField[key].autoComplete}
                type={LoginFormField[key].type}
                className={`outline-none rounded-lg w-[100%] p-2 focus:${
                  inputErrors[key] === true
                    ? "border-red-600"
                    : "border-slate-800"
                } border-2 ${
                  inputErrors[key] === true
                    ? "border-red-600"
                    : "border-transparent"
                }`}
              />
              {inputErrors[key] && (
                <span className="text-xs text-red-200">
                  {LoginFormField[key].error}
                </span>
              )}
            </div>
          ))}

          <button
            type="submit"
            className={`bg-slate-50 border-none outline-none rounded-lg items-center flex justify-center w-[100%] p-2 gap-2 text-sm`}>
            <span>
              {data.status === PageStatus.Loading ? "درحال ورود" : "ورود"}
            </span>
            {data.status === PageStatus.Loading ? <Spinner size="20px" /> : ""}
          </button>
        </form>
      </div>
      <div className="bg-gray-50 flex items-center justify-center md:order-2 order-1">
        <img src={LOGO} className="md:w-[40%] w-[25%]" alt="" />
      </div>
    </LoginLayout>
  );
};

export default LoginForm;
