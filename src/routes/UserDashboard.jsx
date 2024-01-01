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

const UserDashboard = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const { role } = useUserStore(
    (state) => ({
      role: state?.role,
    }),
    shallow
  );

  useEffect(() => {
    role !== "student" && navigate("/access-denied");
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let params = serializeFormQuery(e.target);
    setSearchParams(params);
  };
  return (
    <>
      <Header navbar={StudentNavbar} />
      <Announcements projectInfo={StudentMockProjectInfo} />
      <ProjectTableFiltersForm submitHandeler={handleFormSubmit} />
      <ProjectsTable
        info={{ headers: ProjectsTableHeaders, data: TableMockData }}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default UserDashboard;
