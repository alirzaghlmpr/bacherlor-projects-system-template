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
const Thesises = () => {
  const navigate = useNavigate();
  // const { role } = useUserStore(
  //   (state) => ({
  //     role: state?.role,
  //   }),
  //   shallow
  // );

  // useEffect(() => {
  //   role !== "supervisor" && navigate("/access-denied");
  // }, []);
  const changeHandler = (id, status) => {
    console.log(id, status);
  };
  return (
    <>
      <Header navbar={SupervisorNavbar} />
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
              <td className="whitespace-nowrap px-6 py-4">
                درحال بررسی
                <br />
                <p
                  data-id="1011"
                  className="flex justify-center items-center gap-5 mt-2">
                  <button className="text-xs px-2 py-1 text-white rounded-lg mx-3 bg-slate-500">
                    <SupervisorRequestModal
                      buttonContent={"تغییر وضعیت"}
                      header={"هدر"}
                      content={"محتوا"}
                      changeHandeler={changeHandler}
                      id={"2"}
                      participants={[
                        { name: "اسم اسم", suid: "123456" },
                        { name: "اسم اسم", suid: "123456" },
                      ]}
                    />
                  </button>
                </p>
              </td>
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

export default Thesises;
