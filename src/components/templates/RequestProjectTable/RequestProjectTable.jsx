import NotifMessages from "../../../constants/NotifMessages";
import sendNotif from "../../../utils/sendNotif";
import SupervisorRequestsTable from "../../shared/SupervisorRequestsTable/SupervisorRequestsTable";
import useUserStore from "../../../store/useUserStore";
import { useState, useEffect } from "react";
import PageStatus from "../../../constants/PageStatus";
import { changeClaimStatus } from "../../../apis";
import axios from "axios";
import Spinner from "../../shared/Spinner";

const RequestProjectTable = ({ info, requestable = true }) => {
  const { token } = useUserStore((state) => ({
    token: state?.token,
  }));

  const [pageStatus, setPageStatus] = useState(PageStatus.Init);

  const { headers, data } = info;

  const handleModalAccept = async (id, status, participants) => {
    const data = {
      project_id: id,
      status: status,
      student_id: participants[0]["suid"],
    };

    setPageStatus(PageStatus.Loading);
    try {
      console.log(data);
      const result = await axios.post(changeClaimStatus(), data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      setPageStatus(PageStatus.Fetched);
      sendNotif(
        NotifMessages?.Project?.Success?.text,
        NotifMessages?.Project?.Success?.type
      );

      setTimeout(() => location.reload(), 3000);
    } catch (e) {
      setPageStatus(PageStatus.Error);
    }

    sendNotif(
      NotifMessages.Project.ChangeStatus.text,
      NotifMessages.Project.ChangeStatus.type
    );
  };

  return (
    <>
      {pageStatus == PageStatus.Fetched && (
        <Spinner text="بارگیری مجدد اطلاعات..." size="75" color="#000" />
      )}
      {pageStatus == PageStatus.Loading && (
        <Spinner text="درحال ارسال..." size="75" color="#000" />
      )}
      {pageStatus == PageStatus.Error && (
        <p className="text-center">
          <span>خطایی رخ داد دوباره تلاش کنید.</span>
          <br />
          <span
            onClick={() => location.reload()}
            className="underline cursor-pointer">
            بارگیری مجدد صفحه
          </span>
        </p>
      )}
      {pageStatus == PageStatus.Init && (
        <SupervisorRequestsTable
          headers={headers}
          data={data}
          handleModalAccept={requestable && handleModalAccept}
        />
      )}
    </>
  );
};

export default RequestProjectTable;
