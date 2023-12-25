import SupervisorRequestsTable from "../../shared/SupervisorRequestsTable/SupervisorRequestsTable";

const RequestProjectTable = ({ info, requestable = true }) => {
  const { headers, data } = info;

  const handleModalAccept = (id, status) => {
    const info = { id: id, status: status };

    console.log(info);
  };

  return (
    <SupervisorRequestsTable
      headers={headers}
      data={data}
      handleModalAccept={requestable && handleModalAccept}
    />
  );
};

export default RequestProjectTable;
