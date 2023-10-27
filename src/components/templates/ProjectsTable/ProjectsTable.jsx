import Table from "../../shared/Table";
const ProjectsTable = ({ info }) => {
  const { headers, data } = info;
  return <Table headers={headers} data={data} />;
};

export default ProjectsTable;
