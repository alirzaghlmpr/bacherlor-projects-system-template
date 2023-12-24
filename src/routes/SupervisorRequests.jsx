import Header from "../components/templates/Header";

import StudentMockProjectInfo from "../mocks/StudentMockProjectInfo";
import Announcements from "../components/templates/Announcements";
import RequestProjectTable from "../components/templates/RequestProjectTable/RequestProjectTable";
import RequestedProjectsTableHeaders from "../constants/RequestedProjectsTableHeaders";
import SupervisorMockRequestProjectInfo from "../mocks/SupervisorMockRequestProjectInfo";
import SupervisorNavbar from "../constants/SupervisorNavbar";

const SupervisorRequests = () => {
  return (
    <>
      <Header navbar={SupervisorNavbar} />
      <Announcements projectInfo={StudentMockProjectInfo} />
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
