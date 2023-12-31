import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthProvider from "./components/layouts/AuthProvider";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProject from "./routes/AddProject";
import UserDashboard from "./routes/UserDashboard";
import Requests from "./routes/Requests";
import SupervisorDashboard from "./routes/SupervisorDashboard";
import SupervisorRequests from "./routes/SupervisorRequests";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/addproject",
    element: <AddProject />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
