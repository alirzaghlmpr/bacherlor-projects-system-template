import Header from "../components/templates/Header";
import StudentNavbar from "../constants/StudentNavbar";

import StudentMockProjectInfo from "../mocks/StudentMockProjectInfo";
import Announcements from "../components/templates/Announcements";
import RequestProjectTable from "../components/templates/RequestProjectTable/RequestProjectTable";
import RequestedProjectsTableHeaders from "../constants/RequestedProjectsTableHeaders";
import StudentMockRequestProjectInfo from "../mocks/StudentMockRequestProjectInfo";

import useUserStore from "../store/useUserStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import sendNotif from "../utils/sendNotif";
import NotifMessages from "../constants/NotifMessages";

const Requests = () => {
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
