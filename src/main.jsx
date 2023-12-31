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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/addproject",
    element: (
      <AuthProvider>
        <AddProject />
      </AuthProvider>
    ),
  },
  {
    path: "/panel",
    element: (
      <AuthProvider>
        <SupervisorDashboard />
      </AuthProvider>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <AuthProvider>
        <UserDashboard />
      </AuthProvider>
    ),
  },
  {
    path: "/access-denied",
    element: <AccessDenied />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
