import ProjectsTableHeaders from "./constants/ProjectsTableHeaders";
import TableMockData from "./mocks/TableMockData";
import LoginForm from "./components/templates/LoginForm";
import Table from "./components/shared/Table";
const App = () => {
  return <Table headers={ProjectsTableHeaders} data={TableMockData} />;
};

export default App;
