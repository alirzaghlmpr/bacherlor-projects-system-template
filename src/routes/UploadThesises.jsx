import Header from "../components/templates/Header";
import StudentNavbar from "../constants/StudentNavbar";

import StudentMockProjectInfo from "../mocks/StudentMockProjectInfo";
import Announcements from "../components/templates/Announcements";
import RequestProjectTable from "../components/templates/RequestProjectTable/RequestProjectTable";
import ThesisesTable from "../components/templates/ThesisesTable";
import RequestedProjectsTableHeaders from "../constants/RequestedProjectsTableHeaders";
import StudentMockRequestProjectInfo from "../mocks/StudentMockRequestProjectInfo";

import useUserStore from "../store/useUserStore";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import SupervisorNavbar from "../constants/SupervisorNavbar";

import SupervisorRequestModal from "../components/shared/SupervisorRequestModal/SupervisorRequestModal";
import { Link } from "react-router-dom";
import sendNotif from "../utils/sendNotif";
import NotifMessages from "../constants/NotifMessages";

const UploadThesises = () => {
  const navigate = useNavigate();
  const { localStorageKey } = useUserStore((state) => ({
    localStorageKey: state?.localStorageKey,
  }));

  useEffect(() => {
    const localStorageData = localStorage.getItem(localStorageKey);
    if (localStorageData) {
      const { role } = JSON.parse(localStorageData);
      console.log(role);
      role !== "student" && navigate("/access-denied");
    } else {
      navigate("/login");
      sendNotif(
        NotifMessages.Login.NoToken.text,
        NotifMessages.Login.NoToken.type
      );
    }
  }, []);

  const handleFormSubmit = () => {};
  return (
    <>
      <Header navbar={StudentNavbar} />
      <Announcements projectInfo={StudentMockProjectInfo} />
      <form
        autoComplete="on"
        onSubmit={handleFormSubmit}
        className="flex flex-col my-5 justify-start items-start gap-5 p-4">
        <div className="md:w-[40%] w-[100%]">
          <label
            htmlFor={"title"}
            className="block mb-2 text-sm text-slate-700">
            عنوان
          </label>
          <input
            name={"title"}
            id={"title"}
            className="outline-none bg-slate-200 rounded-lg w-[100%] p-2 focus:bg-slate-100"></input>
        </div>

        <div className="md:w-[40%] w-[100%]">
          <label
            htmlFor={"title"}
            className="block mb-2 text-sm text-slate-700">
            شماره (های) دانشجویی(با کاما جدا شود)
          </label>
          <input
            name={"title"}
            id={"title"}
            placeholder="...,123456789,987654321"
            className="outline-none bg-slate-200 rounded-lg w-[100%] p-2 focus:bg-slate-100"></input>
        </div>
        <div className="md:w-[40%] w-[100%]">
          <label
            htmlFor={"supervisor"}
            className="block mb-2 text-sm text-slate-700">
            استاد راهنما
          </label>
          <select
            name="supervisor"
            id="supervisor"
            className="outline-none bg-slate-200 rounded-lg w-[100%] p-2 focus:bg-slate-100">
            <option value="1011">بیگی</option>
            <option value="1012">شایق</option>
          </select>
        </div>
        <div className="md:w-[40%] w-[100%]">
          <label htmlFor={"file"} className="block mb-2 text-sm text-slate-700">
            فایل پایان نامه
          </label>
          <input type="file" name="file" id="file" />
        </div>

        <button
          type="submit"
          className={`bg-slate-500 text-slate-50 border-none outline-none rounded-lg items-center flex justify-center px-6 py-3 gap-2 text-sm md:w-[40%] w-[100%]`}>
          <span>اضافه کردن پایان نامه</span>
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm font-light">
          <thead className="border-b dark:border-neutral-500 font-bold text-slate-50 bg-slate-500">
            <tr className="text-center">
              <th scope="col" className="px-6 py-4">
                ردیف
              </th>
              <th scope="col" className="px-6 py-4">
                تاریخ
              </th>
              <th scope="col" className="px-6 py-4">
                عنوان
              </th>
              <th scope="col" className="px-6 py-4">
                وضعیت
              </th>
              <th scope="col" className="px-6 py-4">
                شناسه
              </th>
              <th scope="col" className="px-6 py-4">
                فایل پایان نامه
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:border-neutral-500 text-center ">
              <td className="whitespace-nowrap px-6 py-4 font-bold">1</td>
              <td className="whitespace-nowrap px-6 py-4">1402/10/10</td>
              <td className="whitespace-nowrap px-6 py-4">
                پیاده سازی سامانه پروژه های کارشناسی
              </td>
              <td className="whitespace-nowrap px-6 py-4">درحال بررسی</td>
              <td className="whitespace-nowrap px-6 py-4">1011</td>
              <td className="whitespace-nowrap px-6 py-4">
                <a
                  href="https://google.com"
                  className="text-xs px-2 py-1 text-white rounded-lg mx-3 bg-slate-500">
                  دانلود فایل پایان نامه
                </a>
              </td>
            </tr>
            <tr className="border-b dark:border-neutral-500 text-center bg-slate-100">
              <td className="whitespace-nowrap px-6 py-4 font-bold">2</td>
              <td className="whitespace-nowrap px-6 py-4">1402/10/11</td>
              <td className="whitespace-nowrap px-6 py-4">
                پیاده سازی سامانه حضور غیاب با qrcode
              </td>
              <td className="whitespace-nowrap px-6 py-4">رد شده</td>
              <td className="whitespace-nowrap px-6 py-4">2011</td>
              <td className="whitespace-nowrap px-6 py-4">
                <a
                  href="https://google.com"
                  className="text-xs px-2 py-1 text-white rounded-lg mx-3 bg-slate-500">
                  دانلود فایل پایان نامه
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UploadThesises;
