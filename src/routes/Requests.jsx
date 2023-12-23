import Header from "../components/templates/Header";
import StudentNavbar from "../constants/StudentNavbar";

import StudentMockProjectInfo from "../mocks/StudentMockProjectInfo";
import Announcements from "../components/templates/Announcements";
import RequestProjectTable from "../components/templates/RequestProjectTable/RequestProjectTable";
import RequestedProjectsTableHeaders from "../constants/RequestedProjectsTableHeaders";
import StudentMockRequestProjectInfo from "../mocks/StudentMockRequestProjectInfo";

const Requests = () => {
  return (
    <>
      <Header navbar={StudentNavbar} />
      <Announcements projectInfo={StudentMockProjectInfo} />
      <RequestProjectTable
        info={{
          headers: RequestedProjectsTableHeaders,
          data: StudentMockRequestProjectInfo,
        }}
      />
    </>
  );
};

export default Requests;
