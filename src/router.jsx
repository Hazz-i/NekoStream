import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "@/Pages/Home";
import Ongoing from "@/Pages/Ongoing";
import App from "@/App";
import Detail from "@/Pages/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Navigate to="/home" /> },
      { path: "/home", element: <Home /> },
      { path: "/ongoing-all*", element: <Ongoing /> },
      { path: "/detail", element: <Detail /> },
    ],
  },
]);

export default router;
