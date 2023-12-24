import Table from "../../shared/Table";
import sendNotif from "../../../utils/sendNotif";
import NotifMessages from "../../../constants/NotifMessages";

const ProjectsTable = ({ info, requestable = true }) => {
  const { headers, data } = info;

  const handleModalAccept = (id, participants) => {
    console.log(`modal triggered! , item id ${id}`);
    console.log(participants);

    participants.every((participant) => participant?.text != "")
      ? sendNotif(
          NotifMessages?.Project?.Success.text,
          NotifMessages?.Project?.Success.type
        )
      : sendNotif(
          NotifMessages?.Project?.Error?.EmptyOrWrongSUID?.text,
          NotifMessages?.Project?.Error?.EmptyOrWrongSUID?.type
        );
  };

  return (
    <Table
      headers={headers}
      data={data}
      handleModalAccept={requestable && handleModalAccept}
    />
  );
};

export default ProjectsTable;
