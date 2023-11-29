import Table from "../../shared/Table";
import sendNotif from "../../../utils/sendNotif";
import NotifMessages from "../../../constants/NotifMessages";

const ProjectsTable = ({ info }) => {
  const { headers, data } = info;

  const handleModalAccept = (id) => {
    console.log(`modal triggered! , item id ${id}`);

    sendNotif(
      NotifMessages?.Project?.Success.text,
      NotifMessages?.Project?.Success.type
    );
  };

  return (
    <Table
      headers={headers}
      data={data}
      handleModalAccept={handleModalAccept}
    />
  );
};

export default ProjectsTable;
