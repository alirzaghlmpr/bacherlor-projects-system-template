import Header from "../components/templates/Header";

import RequestProjectTable from "../components/templates/RequestProjectTable/RequestProjectTable";
import RequestedProjectsTableHeaders from "../constants/RequestedProjectsTableHeaders";
import SupervisorNavbar from "../constants/SupervisorNavbar";
import SupervisorActiveProjects from "../components/templates/SupervisorActiveProjects";
import { useNavigate } from "react-router";
import useUserStore from "../store/useUserStore";
import { useEffect, useState } from "react";
import PageStatus from "../constants/PageStatus";
import axios from "axios";
import { getProfessorRequests } from "../apis";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";
import sendNotif from "../utils/sendNotif";
import NotifMessages from "../constants/NotifMessages";
import ProjectRequestStatus from "../constants/ProjectRequestStatus";
import Spinner from "../components/shared/Spinner";

const SupervisorRequests = () => {
  const navigate = useNavigate();

  const [pageStatus, setPageStatus] = useState(PageStatus.Init);

  const [data, setData] = useState(null);
  const [activeProjects, setActiveProjects] = useState(null);

  const { localStorageKey } = useUserStore((state) => ({
    localStorageKey: state?.localStorageKey,
  }));

  useEffect(() => {
    const getData = async (token) => {
      try {
        setPageStatus(PageStatus.Loading);

        let result = await axios.get(getProfessorRequests(), {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPageStatus(PageStatus.Fetched);

        if (result?.data.length == 0) setData(null);
        else {
          const datas = [];
          const activeProjects = [];

          result.data.forEach((item) => {
            const { claims } = item;
            if (claims.length !== 0) {
              let formattedData = claims.map(
                ({ students, project, created_at }) => ({
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
                  participants: students.map(({ name, id }) => ({
                    name: name,
                    suid: id,
                  })),
                })
              );

              if (formattedData) {
                if (formattedData[0].status == ProjectRequestStatus.accepted)
                  activeProjects.push(formattedData[0]);
                formattedData.map((d) => datas.push(d));
                setData(datas);
              }
            }
          });

          setData(datas);
          setActiveProjects(activeProjects);
        }
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

      {data && activeProjects && (
        <>
          <SupervisorActiveProjects projects={activeProjects} />
          <RequestProjectTable
            info={{
              headers: RequestedProjectsTableHeaders,
              data: data,
            }}
          />
        </>
      )}

      {pageStatus === PageStatus.Fetched && !data && <p>درخواستی وجود ندارد</p>}
    </>
  );
};

export default SupervisorRequests;
