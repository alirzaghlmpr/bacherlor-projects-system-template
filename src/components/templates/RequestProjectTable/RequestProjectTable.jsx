import Table from "../../shared/Table";

const RequestProjectTable = ({ info }) => {
  const { headers, data } = info;

  return <Table headers={headers} data={data} />;
};

export default RequestProjectTable;
