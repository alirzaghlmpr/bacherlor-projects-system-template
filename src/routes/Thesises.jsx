import Header from "../components/templates/Header";

import useUserStore from "../store/useUserStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SupervisorNavbar from "../constants/SupervisorNavbar";

import PageStatus from "../constants/PageStatus";
import { getProfessorProjects } from "../apis";
import axios from "axios";
import sendNotif from "../utils/sendNotif";
import NotifMessages from "../constants/NotifMessages";
import Spinner from "../components/shared/Spinner";
import { host } from "../apis";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";

const Thesises = () => {
  const navigate = useNavigate();
  const { localStorageKey } = useUserStore((state) => ({
    localStorageKey: state?.localStorageKey,
  }));

  const [pageStatus, setPageStatus] = useState(PageStatus.Init);
  const [activeProjects, setActiveProjects] = useState([]);
  const [allProject, setAllProject] = useState([]);

  useEffect(() => {
    const getData = async (token) => {
      try {
        setPageStatus(PageStatus.Loading);

        let r = await axios.get(getProfessorProjects(), {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPageStatus(PageStatus.Fetched);

        let allProjects =
          r?.data.length == 0
            ? null
            : r.data.map(({ project }) => ({
                title: project.title,
                date: project.file_upload_date,
                status: !project.is_available,
                project_id: project.project_id,
                file: project.project_file,
              }));

        setActiveProjects(allProjects.filter(({ file }) => file));
        setAllProject(allProjects);
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
      role !== "professor" && navigate("/access-denied");
      getData(token);
    } else {
      navigate("/login");
      sendNotif(
        NotifMessages.Login.NoToken.text,
        NotifMessages.Login.NoToken.type
      );
    }
  }, []);

  return (
    <>
      <Header navbar={SupervisorNavbar} />
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

      {allProject.length == 0 && (
        <p className="font-bold text-center p-3 my-10 flex flex-col">
          <span>شما پروژه فعالی ندارید</span>
          <span
            onClick={() => {
              navigate("/supervisorrequests");
            }}
            className="underline cursor-pointer">
            مشاهده درخواست ها
          </span>
        </p>
      )}

      {allProject.length > 0 && activeProjects.length == 0 && (
        <p className="font-bold text-center p-3 my-5">
          پایان نامه ای اپلود نشده است
        </p>
      )}

      {pageStatus != PageStatus.Loading && activeProjects.length > 0 && (
        <div className="overflow-x-auto my-10">
          <table className="min-w-full text-sm font-light">
            <thead className="border-b dark:border-neutral-500 font-bold text-slate-50 bg-slate-500">
              <tr className="text-center">
                <th scope="col" className="px-6 py-4">
                  تاریخ
                </th>
                <th scope="col" className="px-6 py-4">
                  عنوان
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

export default Thesises;
