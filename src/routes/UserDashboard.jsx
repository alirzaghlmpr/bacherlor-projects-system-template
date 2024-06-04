import ProjectsTableHeaders from "../constants/ProjectsTableHeaders";
import TableMockData from "../mocks/TableMockData";
import ProjectsTable from "../components/templates/ProjectsTable/ProjectsTable";

import { RadiosFiltersName } from "../constants/FormRadioFilters";
import { ProjectQueryFilter } from "../constants/ProjectsQueryFilter";
import { NumberFilterName } from "../constants/ProjectsNumberFilter";
import {
  SelectOptionName,
  SelectDefaultOption,
} from "../constants/ProjectsSelectOptions";

import ProjectTableFiltersForm from "../components/templates/ProjectTableFiltersForm";
import Header from "../components/templates/Header";
import SupervisorNavbar from "../constants/SupervisorNavbar";
import StudentNavbar from "../constants/StudentNavbar";

import StudentMockProjectInfo from "../mocks/StudentMockProjectInfo";
import Announcements from "../components/templates/Announcements";
import Modal from "../components/shared/Modal";
import ConfirmProjectModal from "../constants/ConfirmProjectModal";
import AccessDenied from "../components/templates/AccessDenied";

import useUserStore from "../store/useUserStore";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import serializeFormQuery from "../utils/serializeFormQuery";
import useSWR from "swr";
import { getProjects } from "../apis";
import Spinner from "../components/shared/Spinner";
import ProjectStatus from "../constants/ProjectStatus";
import NotifMessages from "../constants/NotifMessages";
import sendNotif from "../utils/sendNotif";

const UserDashboard = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${getProjects()}?${searchParams.toString()}`,
    fetcher
  );

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let params = serializeFormQuery(e.target);
    setSearchParams(params);
  };

  return (
    <>
      <Header navbar={StudentNavbar} />
      <Announcements projectInfo={null} text="شما پروژه ای اخذ نکرده اید" />
      <ProjectTableFiltersForm submitHandeler={handleFormSubmit} />
      {data && (
        <>
          {data.length == 0 ? (
            <p className="text-center font-bold py-5 my-5">
              پروژه ای با این مشخصات یافت نشد!
            </p>
          ) : (
            <ProjectsTable
              info={{
                headers: ProjectsTableHeaders,
                data: data.map(
                  ({
                    title,
                    professor_name,
                    is_available,
                    project_id,
                    max_students,
                  }) => ({
                    title: title,
                    professor_name: professor_name,
                    capacity: max_students,
                    is_available: is_available
                      ? ProjectStatus.free
                      : ProjectStatus.full,
                    id: project_id,
                  })
                ),
              }}
              requestable={true}
            />
          )}
        </>
      )}
      {isLoading && <Spinner size="75" color="#000" />}
      {error && <p>خطایی رخ داده ، مجددا تلاش کنید</p>}
    </>
  );
};

export default UserDashboard;
