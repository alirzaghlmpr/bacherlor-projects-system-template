import Header from "../components/templates/Header";
import StudentNavbar from "../constants/StudentNavbar";

import useUserStore from "../store/useUserStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import sendNotif from "../utils/sendNotif";
import NotifMessages from "../constants/NotifMessages";
import { useRef, useState } from "react";
import PageStatus from "../constants/PageStatus";
import { getStudentRequests } from "../apis";
import axios from "axios";
import Spinner from "../components/shared/Spinner";
import { uploadThesis } from "../apis";
import { host } from "../apis";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";

const UploadThesises = () => {
  const navigate = useNavigate();
  const { localStorageKey, token } = useUserStore((state) => ({
    localStorageKey: state?.localStorageKey,
    token: state?.token,
  }));

  const [pageStatus, setPageStatus] = useState(PageStatus.Init);
  const [activeProjects, setActiveProjects] = useState([]);

  useEffect(() => {
    const getData = async (token) => {
      try {
        setPageStatus(PageStatus.Loading);

        let r = await axios.get(getStudentRequests(), {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPageStatus(PageStatus.Fetched);
        //students -> id,name
        //project -> professor_name , title , is_available
        let allProjects =
          r?.data.length == 0
            ? null
            : r.data.map(({ project, is_approved }) => ({
                title: project.title,
                date: project.file_upload_date,
                status: is_approved,
                project_id: project.project_id,
                file: project.project_file,
              }));

        setActiveProjects(allProjects.filter(({ status }) => status));
        console.log(allProjects.filter(({ status }) => status));
      } catch (e) {
        if (e.response.status === 401) {
          navigate("/login");
          sendNotif(
            NotifMessages.Login.NoToken.text,
            NotifMessages.Login.NoToken.type
          );
        }
        setPageStatus(PageStatus.Error);
      }
    };

    const localStorageData = localStorage.getItem(localStorageKey);
    if (localStorageData) {
      const { role, token } = JSON.parse(localStorageData);
      console.log(role);
      role !== "student" && navigate("/access-denied");
      getData(token);
    } else {
      navigate("/login");
      sendNotif(
        NotifMessages.Login.NoToken.text,
        NotifMessages.Login.NoToken.type
      );
    }
  }, []);

  const inputFile = useRef(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (inputFile.current) {
      const file = inputFile.current.files[0];
      console.log(file.name);
      console.log(file.name.includes(".doc"));
      if (
        file.name.includes(".doc") ||
        file.name.includes(".docx") ||
        file.name.includes(".pdf")
      ) {
        const data = new FormData();
        data.append("file", file);
        let { project_id } = activeProjects[0];

        try {
          setPageStatus(PageStatus.Loading);

          const result = await axios.post(uploadThesis(project_id), data, {
            headers: { Authorization: `Bearer ${token}` },
          });

          sendNotif(
            NotifMessages.Thesis.Success.text,
            NotifMessages.Thesis.Success.type
          );

          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (e) {
          setPageStatus(PageStatus.Error);
          console.log(e);
        }
      } else {
        sendNotif(
          NotifMessages.Thesis.BadFormat.text,
          NotifMessages.Thesis.BadFormat.type
        );

        return;
      }
    }
  };

  return (
    <>
      <Header navbar={StudentNavbar} />

      {pageStatus === PageStatus.Loading && (
        <Spinner text="درحال بارگزاری..." size="75" color="#000" />
      )}
      {pageStatus == PageStatus.Error && (
        <p className="text-center my-5">
          <span>خطایی رخ داد دوباره تلاش کنید.</span>
          <br />
          <span
            onClick={() => location.reload()}
            className="underline cursor-pointer">
            بارگیری مجدد صفحه
          </span>
        </p>
      )}
      {activeProjects.length == 0 && (
        <p className="font-bold text-center p-3 my-10 flex flex-col">
          <span>شما پروژه ای اخذ نکرده اید</span>
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/dashboard")}>
            اخذ پروژه
          </span>
        </p>
      )}
      {pageStatus == PageStatus.Init ||
        (pageStatus == PageStatus.Fetched && activeProjects.length != 0 && (
          <form
            autoComplete="on"
            onSubmit={handleFormSubmit}
            className="flex flex-col my-5 justify-start items-start gap-5 p-4">
            <div className="md:w-[40%] w-[100%]">
              <label
                htmlFor={"file"}
                className="block mb-2 text-sm text-slate-700">
                فایل پایان نامه
              </label>
              <input
                accept=".doc,.docx,.pdf"
                ref={inputFile}
                type="file"
                name="file"
                id="file"
              />
            </div>

            <button
              type="submit"
              className={`bg-slate-500 text-slate-50 border-none outline-none rounded-lg items-center flex justify-center px-6 py-3 gap-2 text-sm md:w-[40%] w-[100%]`}>
              <span> اضافه کردن/جایگزین کردن پایان نامه </span>
            </button>
          </form>
        ))}

      {activeProjects.length > 0 && !activeProjects[0].file && (
        <p className="font-bold text-center p-3">
          پایان نامه ای اپلود نکرده اید
        </p>
      )}
      {pageStatus != PageStatus.Loading &&
        activeProjects.length > 0 &&
        activeProjects[0].file && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm font-light">
              <thead className="border-b dark:border-neutral-500 font-bold text-slate-50 bg-slate-500">
                <tr className="text-center">
                  <th scope="col" className="px-6 py-4">
                    تاریخ اپلود
                  </th>
                  <th scope="col" className="px-6 py-4">
                    عنوان پروژه
                  </th>
                  <th scope="col" className="px-6 py-4">
                    شناسه پروژه
                  </th>
                  <th scope="col" className="px-6 py-4">
                    فایل پایان نامه
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeProjects.map(({ date, file, project_id, title }) => {
                  return (
                    <tr
                      key={project_id}
                      className="border-b dark:border-neutral-500 text-center ">
                      <td className="whitespace-nowrap px-6 py-4">
                        {new DateObject(date)
                          .convert(persian, persian_fa)
                          .format("YYYY/MM/DD")}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{title}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {project_id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <a
                          href={`${host()}${file}`}
                          className="text-xs px-2 py-1 text-white rounded-lg mx-3 bg-slate-500">
                          دانلود فایل پایان نامه
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
    </>
  );
};

export default UploadThesises;
