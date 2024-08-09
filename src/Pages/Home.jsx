import Header from "@/components/layout/Header";

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "@/context/contextProviders";
import AnimeCard from "@/components/AnimeCard";
import AnimeSkeleton from "@/components/AnimeSekeleton";

const Home = () => {
  // CONTEXT PROVIDER
  const { ongoingHome } = useStateContext();

  const [ongoingAnimes, setOngoingAnimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ongoingHome.length == 0 || ongoingHome == undefined ? setIsLoading(true) : setIsLoading(false);

    if (ongoingHome.length > 0) {
      setOngoingAnimes(ongoingHome);
    }
  }, [ongoingHome]);

  return (
    <>
      <Header />
      <div className="container min-h-[95vh] pt-20 flex flex-col justify-center items-center gap-5">
        {/* TOP */}
        <span className="flex gap-5 w-full">
          {/* ONGOING */}
          <div className="w-[53rem] bg-gray-900 rounded-lg py-5 px-5">
            <span className="flex justify-between items-center pb-5">
              <h1 className="font-bold text-xl">Anime Ongoing</h1>
              <NavLink
                to={"/neko-stream/ongoing-all"}
                className={`border-b-2 border-gray-700`}>
                <small className="text-sm ">Tampilkan Lebih</small>
              </NavLink>
            </span>

            <span className="flex gap-5 flex-wrap justify-center items-center">
              {/* SEKELETON */}
              <AnimeSkeleton
                isLoading={isLoading}
                length={15}
              />
              {/* END SEKELETON */}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
                {ongoingAnimes?.map((anime, index) => (
                  <span
                    className="flex gap-4"
                    key={index}>
                    <AnimeCard anime={anime} />
                  </span>
                ))}
              </div>
            </span>
          </div>
          {/* END ONGOING */}

          {/* MOVIE */}
          <div className="grow bg-gray-900 rounded-lg py-5 px-5 flex flex-col">
            <span className="flex justify-between items-center pb-5">
              <h1 className="font-bold text-xl">Anime Movie</h1>
              {/* <NavLink
                to={"/neko-stream/ongoing-all"}
                className={`border-b-2 border-gray-700`}>
                <small className="text-sm ">Tampilkan Lebih</small>
              </NavLink> */}
            </span>

            <span className="flex gap-5 justify-center items-center grow">
              <h1>TODO ^-^ </h1>
            </span>
          </div>
          {/* END MOVIE */}
        </span>
        {/* END TOP */}

        {/* BOTTOM */}
        <span className="grid gap-5 w-full bg-gray-900 rounded-lg py-5 px-5">
          <span className="flex justify-between items-center pb-5">
            <h1 className="font-bold text-xl">Anime Batch</h1>
            {/* <NavLink
                to={"/neko-stream/ongoing-all"}
                className={`border-b-2 border-gray-700`}>
                <small className="text-sm ">Tampilkan Lebih</small>
              </NavLink> */}
          </span>

          <span className="flex gap-5 justify-center items-center grow">
            <h1>TODO ^-^ </h1>
          </span>
        </span>
        {/* END BOTTOM */}
      </div>
    </>
  );
};

export default Home;
