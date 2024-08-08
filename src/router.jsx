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
      { path: "", element: <Navigate to="/neko-stream/home" /> },
      { path: "/neko-stream/home", element: <Home /> },
      { path: "/neko-stream/ongoing-all*", element: <Ongoing /> },
      { path: "/neko-stream/detail", element: <Detail /> },
    ],
  },
]);

export default router;
