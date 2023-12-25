import Table from "../../shared/Table";
import sendNotif from "../../../utils/sendNotif";
import NotifMessages from "../../../constants/NotifMessages";

const ProjectsTable = ({ info, requestable = true }) => {
  const { headers, data } = info;

  const handleModalAccept = (id, students) => {
    const info = { id: id, students: students.map(({ text }) => text) };

    console.log(info);

    students.every((student) => student?.text != "")
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
