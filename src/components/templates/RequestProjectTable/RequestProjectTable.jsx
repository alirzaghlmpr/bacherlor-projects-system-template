import SupervisorRequestsTable from "../../shared/SupervisorRequestsTable/SupervisorRequestsTable";

const RequestProjectTable = ({ info, requestable = true }) => {
  const { headers, data } = info;

  const handleModalAccept = (id, status) => {
    console.log(`modal triggered! , item id ${id} , status ${status} `);
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
