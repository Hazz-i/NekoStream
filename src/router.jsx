import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/Pages/Home";
import Ongoing from "@/Pages/home/Ongoing";
import Batch from "@/Pages/home/Batch";
import Detail from "@/Pages/Detail";
import Movie from "@/Pages/movie/Movie";
import Genre from "@/Pages/Genre";
import Search from "@/Pages/Search";
import NotFound from "@/Pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Navigate to="/neko-stream/home" /> },
      { path: "/neko-stream/*", element: <Navigate to="/neko-stream/home" /> },
      { path: "/neko-stream/home/*", element: <Home /> },
      { path: "/neko-stream/genre/*", element: <Genre /> },
      { path: "/neko-stream/genre/:genre/:page/*", element: <Genre /> },

      { path: "/neko-stream/ongoing-all/*", element: <Ongoing /> },
      { path: "/neko-stream/ongoing-all/:page/*", element: <Ongoing /> },

      { path: "/neko-stream/batch-all/*", element: <Batch /> },
      { path: "/neko-stream/batch-all/:page/*", element: <Batch /> },

      { path: "/neko-stream/movie-all/*", element: <Movie /> },
      { path: "/neko-stream/movie-all/:page/*", element: <Movie /> },
      { path: "/neko-stream/detail/:title/:episode/*", element: <Detail /> },

      { path: "/neko-stream/search/:query/*", element: <Search /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
