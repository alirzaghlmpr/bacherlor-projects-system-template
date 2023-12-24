import ProjectsTableHeaders from "../constants/ProjectsTableHeaders";
import TableMockData from "../mocks/TableMockData";
import ProjectsTable from "../components/templates/ProjectsTable/ProjectsTable";

import { RadiosFiltersName } from "../constants/FormRadioFilters";
import { ProjectQueryFilter } from "../constants/ProjectsQueryFilter";
import { NumberFilterName } from "../constants/ProjectsNumberFilter";
import { SelectOptionName } from "../constants/ProjectsSelectOptions";

import ProjectTableFiltersForm from "../components/templates/ProjectTableFiltersForm";
import Header from "../components/templates/Header";
import SupervisorNavbar from "../constants/SupervisorNavbar";

import StudentMockProjectInfo from "../mocks/StudentMockProjectInfo";
import Announcements from "../components/templates/Announcements";
import Modal from "../components/shared/Modal";
import ConfirmProjectModal from "../constants/ConfirmProjectModal";

const SupervisorDashboard = () => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let formsElements = e.target?.elements;
    const type = formsElements[RadiosFiltersName]?.value;
    const query = formsElements[ProjectQueryFilter]?.value;
    const capacity = formsElements[NumberFilterName]?.value;
    const status = formsElements[SelectOptionName]?.value;

    console.log(
      `type:${type} , query:${query} , capacity:${capacity}, status:${status}`
    );
  };
  return (
    <>
      <Header navbar={SupervisorNavbar} />
      <Announcements projectsNotifCount="1" />
      <ProjectTableFiltersForm submitHandeler={handleFormSubmit} />
      <ProjectsTable
        info={{ headers: ProjectsTableHeaders, data: TableMockData }}
        requestable={false}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default SupervisorDashboard;
