import Root from "./routes/Root";
import UserDashboard from "./routes/UserDashboard";
import Requests from "./routes/Requests";
import SupervisorDashboard from "./routes/SupervisorDashboard";
import SupervisorRequests from "./routes/SupervisorRequests";
import AddProject from "./routes/AddProject";

import useUserStore from "./store/useUserStore";
import shallow from "zustand/shallow";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

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

  //   return (
  //     <QueryClientProvider client={queryClient}>
  //       <Example />
  //     </QueryClientProvider>
  //   );
  // };

  // const Example = () => {
  //   const { data, error, isError, isPending } = useQuery({
  //     queryKey: ["user"],
  //     queryFn: async () => {
  //       const response = await fetch(
  //         "https://jsonplaceholder.typicode.com/users/1"
  //       );
  //       if (!response.ok) throw new Error("something goes wrong!");
  //       return response.json();
  //     },
  //   });

  //   if (isPending) return <p>Loading...</p>;
  //   if (isError) return <p>Error : {error.message}</p>;

  //   return <p>{JSON.stringify(data)}</p>;
};

export default App;
