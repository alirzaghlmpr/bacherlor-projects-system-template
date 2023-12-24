import Header from "../components/templates/Header";

import Announcements from "../components/templates/Announcements";
import RequestProjectTable from "../components/templates/RequestProjectTable/RequestProjectTable";
import RequestedProjectsTableHeaders from "../constants/RequestedProjectsTableHeaders";
import SupervisorMockRequestProjectInfo from "../mocks/SupervisorMockRequestProjectInfo";
import SupervisorNavbar from "../constants/SupervisorNavbar";
import SupervisorActiveProjects from "../components/templates/SupervisorActiveProjects";
import SupervisorActiveProjectsData from "../constants/SupervisorActiveProjectsData";

const SupervisorRequests = () => {
  return (
    <>
      <Header navbar={SupervisorNavbar} />
      <Announcements projectsNotifCount={"2"} />
      <SupervisorActiveProjects projects={SupervisorActiveProjectsData} />
      <RequestProjectTable
        info={{
          headers: RequestedProjectsTableHeaders,
          data: SupervisorMockRequestProjectInfo,
        }}
      />
    </>
  );
};

export default SupervisorRequests;
