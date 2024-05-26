import NotifMessages from "../../../constants/NotifMessages";
import sendNotif from "../../../utils/sendNotif";
import SupervisorRequestsTable from "../../shared/SupervisorRequestsTable/SupervisorRequestsTable";

const ThesisesTable = ({ info, requestable = true }) => {
  const { headers, data } = info;

  const handleModalAccept = (id, status) => {
    const info = { id: id, status: status };

    sendNotif(
      NotifMessages.Project.ChangeStatus.text,
      NotifMessages.Project.ChangeStatus.type
    );
  };

  return (
    <SupervisorRequestsTable
      headers={headers}
      data={data}
      handleModalAccept={requestable && handleModalAccept}
    />
  );
};

export default ThesisesTable;
