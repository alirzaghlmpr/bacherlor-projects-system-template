import Header from "../components/templates/Header";
import StudentNavbar from "../constants/StudentNavbar";

import StudentMockProjectInfo from "../mocks/StudentMockProjectInfo";
import Announcements from "../components/templates/Announcements";
import RequestProjectTable from "../components/templates/RequestProjectTable/RequestProjectTable";
import RequestedProjectsTableHeaders from "../constants/RequestedProjectsTableHeaders";
import StudentMockRequestProjectInfo from "../mocks/StudentMockRequestProjectInfo";

import useUserStore from "../store/useUserStore";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Requests = () => {
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
  return (
    <>
      <Header navbar={StudentNavbar} />
      <Announcements projectInfo={StudentMockProjectInfo} />
      <RequestProjectTable
        info={{
          headers: RequestedProjectsTableHeaders,
          data: StudentMockRequestProjectInfo,
        }}
        requestable={false}
      />
    </>
  );
};

export default Requests;
