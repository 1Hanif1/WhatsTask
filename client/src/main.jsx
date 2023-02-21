import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import "./index.css";
import Home from "./pages/Home";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import ErrorPage from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import { loader as dataLoader } from "./components/DashboardComponent";
import { action as taskAction } from "./components/DashboardComponent";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    errorElement: <ErrorPage />,
    element: <AuthenticationPage />,
    action: authAction,
  },
  {
    path: "/dashboard",
    errorElement: <ErrorPage />,
    element: <Dashboard />,
    loader: dataLoader,
    action: taskAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
