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
import LoginForm from "./components/templates/LoginForm/LoginForm.jsx";
import AccessDenied from "./components/templates/AccessDenied/AccessDenied.jsx";
import Thesises from "./routes/Thesises.jsx";
import UploadThesises from "./routes/UploadThesises.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/addproject",
    element: <AddProject />,
  },
  {
    path: "/panel",
    element: <SupervisorDashboard />,
  },
  {
    path: "/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "/requests",
    element: <Requests />,
  },
  {
    path: "/supervisorrequests",
    element: <SupervisorRequests />,
  },
  {
    path: "/supervisorthesises",
    element: <Thesises />,
  },
  {
    path: "/uploadthesises",
    element: <UploadThesises />,
  },
  {
    path: "/access-denied",
    element: <AccessDenied />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
