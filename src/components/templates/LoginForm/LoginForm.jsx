import { useState } from "react";

import {
  LoginFormField,
  LoginFormKeys,
} from "../../../constants/LoginFormFields";

import sendNotif from "../../../utils/sendNotif";
import checkEmptyOrNull from "../../../utils/checkEmptyOrNull";

import LoginLayout from "../../layouts/LoginLayout";
import Spinner from "../../shared/Spinner";

import NotifMessages from "../../../constants/NotifMessages";

import LOGO from "../../../assets/images/university-logo.png";
import useUserStore from "../../../store/useUserStore";
import { useNavigate } from "react-router";
import useSWRMutation from "swr/mutation";
import { login } from "../../../apis";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();

  const sendRequest = async (url, { arg }) => axios.post(url, arg);

  const { trigger, isMutating } = useSWRMutation(login(), sendRequest);

  const { setUserInfo, localStorageKey } = useUserStore((state) => ({
    setUserInfo: state?.setUserInfo,
    localStorageKey: state?.localStorageKey,
  }));

  const [inputErrors, setInputErrors] = useState({
    username: false,
    password: false,
  });

  const requestLogin = async (username, password) => {
    try {
      const { data: result } = await trigger({
        username: username,
        password: password,
      });

      let userCredential = {
        firstName: result?.user?.first_name,
        lastName: result?.user?.last_name,
        suid: result?.user?.suid,
        token: result?.token,
        role: result?.role,
      };

      setUserInfo(userCredential);
      localStorage.setItem(localStorageKey, JSON.stringify(userCredential));

      sendNotif(
        NotifMessages.Login.Success.text,
        NotifMessages.Login.Success.type
      );

      setTimeout(() => {
        userCredential?.role === "student"
          ? navigate("/dashboard")
          : navigate("/panel");
      }, 2000);
    } catch (e) {
      sendNotif(e?.response?.data?.message, NotifMessages.Login.Error.type);
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
            disabled={isMutating}
            type="submit"
            className={`bg-slate-50 border-none outline-none rounded-lg items-center flex justify-center w-[100%] p-2 gap-2 text-sm`}>
            <span>{isMutating ? "درحال ورود" : "ورود"}</span>
            {isMutating ? <Spinner size="20px" /> : ""}
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
