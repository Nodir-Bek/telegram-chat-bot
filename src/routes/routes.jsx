import { Navigate } from "react-router-dom";
import Home from "../containers/Home";
import Form from "../views/Form";
import Main from "../views/Main";

export const routes = [
  {
    element: <Home />,
    children: [
      {
        index: true,
        path: "/?",
        element: <Main />,
      },
      {
        path: "/message/:projectId",
        element: <Form />,
      },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
];
