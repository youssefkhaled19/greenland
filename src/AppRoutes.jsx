import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./UI/AppLayout.jsx";
import Login from "./Auth/login.jsx";
import Signin from "./Auth/signin.jsx";
import Upload from "./pages/Upload.jsx";
import Generate from "./pages/generated.jsx";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signin", element: <Signin /> },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/Upload", element: <Upload /> },
      { path: "/Generated", element: <Generate /> },
    ],
  },
]);
