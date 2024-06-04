import Header from "../components/templates/Header";
import StudentNavbar from "../constants/StudentNavbar";

import StudentMockProjectInfo from "../mocks/StudentMockProjectInfo";
import Announcements from "../components/templates/Announcements";
import RequestProjectTable from "../components/templates/RequestProjectTable/RequestProjectTable";
import RequestedProjectsTableHeaders from "../constants/RequestedProjectsTableHeaders";
import StudentMockRequestProjectInfo from "../mocks/StudentMockRequestProjectInfo";

import useUserStore from "../store/useUserStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import sendNotif from "../utils/sendNotif";
import NotifMessages from "../constants/NotifMessages";
import axios from "axios";
import { getStudentRequests } from "../apis";
import Spinner from "../components/shared/Spinner";
import PageStatus from "../constants/PageStatus";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";
import ProjectRequestStatus from "../constants/ProjectRequestStatus";
import SupervisorActiveProjects from "../components/templates/SupervisorActiveProjects";

const Requests = () => {
  const navigate = useNavigate();

  const [pageStatus, setPageStatus] = useState(PageStatus.Init);
  const [data, setData] = useState(null);
  const [activeProjects, setActiveProjects] = useState(null);

  const { localStorageKey } = useUserStore((state) => ({
    localStorageKey: state?.localStorageKey,
  }));

  console.log(data);

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
            : r.data.map(({ students, project }) => ({
                title: project.title,
                participants: students.map(({ id, name }) => ({
                  suid: id,
                  name: name,
                })),
                status: project?.is_available,
              }));
        setActiveProjects(allProjects.filter(({ status }) => !status));
        setData(
          r?.data.length == 0
            ? null
            : r.data.map(({ created_at, project }) => ({
                date: new DateObject(created_at)
                  .convert(persian, persian_fa)
                  .format("YYYY/MM/DD"),
                title: project?.title,
                supervisor: project?.professor_name,
                capacity: project?.max_students,
                status:
                  project?.claimed_at == null
                    ? ProjectRequestStatus.pending
                    : ProjectRequestStatus.accepted,
                id: project?.project_id,
              }))
        );
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

      <div className="my-10"></div>

      {data && (
        <>
          {activeProjects && activeProjects.length > 0 ? (
            <SupervisorActiveProjects projects={activeProjects} />
          ) : (
            <p className="flex p-3 flex-col my-5 text-sm">
              پروژه فعالی برای شما وجود ندارد
            </p>
          )}
          <RequestProjectTable
            info={{
              headers: RequestedProjectsTableHeaders,
              data: data,
            }}
            requestable={false}
          />
        </>
      )}
      {pageStatus === PageStatus.Fetched && !data && (
        <p className="font-bold text-center my-5">درخواستی وجود ندارد</p>
      )}
    </>
  );
};

export default Requests;

//mohamadmohamadi
