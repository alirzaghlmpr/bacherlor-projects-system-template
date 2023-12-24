import Root from "./routes/Root";
import UserDashboard from "./routes/UserDashboard";
import Requests from "./routes/Requests";
import SupervisorDashboard from "./routes/SupervisorDashboard";
import SupervisorRequests from "./routes/SupervisorRequests";
import AddProject from "./routes/AddProject";

import useUserStore from "./store/useUserStore";
import shallow from "zustand/shallow";

const App = () => {
  // const { firstName, lastName, suid, setUserInfo, resetUserInfo } =
  //   useUserStore(
  //     (state) => ({
  //       firstName: state?.firstName,
  //       lastName: state?.lastName,
  //       suid: state?.suid,
  //       setUserInfo: state?.setUserInfo,
  //       resetUserInfo: state?.resetUserInfo,
  //     }),
  //     shallow
  //   );

  // return (
  //   <>
  //     <p>
  //       {firstName}, {lastName} , {suid}
  //     </p>

  //     <button
  //       onClick={() =>
  //         setUserInfo({
  //           firstName: "ali",
  //           lastName: "gh",
  //           suid: "123465",
  //         })
  //       }>
  //       change
  //     </button>

  //     <button onClick={resetUserInfo}>reset</button>
  //   </>
  // );

  return <AddProject />;
};

export default App;
