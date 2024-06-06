import Header from "../components/templates/Header";
import StudentNavbar from "../constants/StudentNavbar";

import useUserStore from "../store/useUserStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useSWR from "swr";
import Spinner from "../components/shared/Spinner";
import NotifMessages from "../constants/NotifMessages";
import sendNotif from "../utils/sendNotif";
import { completedProjects } from "../apis";
import { host } from "../apis";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";

const CompletedProjectsSt = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(completedProjects(), fetcher);

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

  return (
    <>
      <Header navbar={StudentNavbar} />
      <div className="my-10"></div>
      {data && (
        <>
          {data.length == 0 ? (
            <p className="text-center font-bold py-5 my-5">
              هنوز پروژه ای تکمیل نشده
            </p>
          ) : (
            <>
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
                        استاد
                      </th>
                      <th scope="col" className="px-6 py-4">
                        افراد
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
                    {data.map(
                      ({
                        file_upload_date,
                        project_file,
                        title,
                        project_id,
                        professor_name,
                        claimed_by,
                      }) => {
                        return (
                          <tr
                            key={project_id}
                            className="border-b dark:border-neutral-500 text-center ">
                            <td className="whitespace-nowrap px-6 py-4">
                              {new DateObject(file_upload_date)
                                .convert(persian, persian_fa)
                                .format("YYYY/MM/DD")}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {title}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {professor_name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {claimed_by.map(({ name }) => (
                                <p key={name}>{name}</p>
                              ))}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {project_id}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <a
                                href={`${host()}${project_file}`}
                                className="text-xs px-2 py-1 text-white rounded-lg mx-3 bg-slate-500">
                                دانلود فایل پایان نامه
                              </a>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
              <p>{console.log(data)}</p>
            </>
          )}
        </>
      )}
      {isLoading && <Spinner size="75" color="#000" />}
      {error && <p>خطایی رخ داده ، مجددا تلاش کنید</p>}
    </>
  );
};

export default CompletedProjectsSt;
