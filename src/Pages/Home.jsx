import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import axiosClient from "@/axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [ongoingAnimes, setOngoingAnimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAnimesResponse = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get(`/home`);
        setOngoingAnimes(response.data.data);
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimesResponse();
  }, []);

  return (
    <>
      <Header />
      <div className="container min-h-[80vh] pt-20 flex flex-col">
        {/* ONGOING */}
        <span className="container bg-gray-900 rounded-lg pb-5">
          <div className="flex justify-between items-center py-5">
            <h1 className="font-bold text-xl">Anime Ongoing</h1>
            <NavLink
              to={"/neko-stream/ongoing-all"}
              className={`border-b-2 border-gray-700`}>
              <small className="text-sm ">Tampilkan Lebih</small>
            </NavLink>
          </div>

          <div className="flex gap-5 flex-wrap justify-center items-center">
            {/* SEKELETON */}
            <div className="flex gap-5 flex-wrap justify-center items-center">
              {isLoading &&
                Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-3">
                    <span className="flex gap-4 max-w-[25rem]">
                      {/* CARD */}
                      <Skeleton className="w-[145px] h-[200px] rounded-xl" />
                      {/* END CARD */}

                      {/* CONTENT RIGHT CARD */}
                      <div className="text-wrap max-w-[250px]">
                        <h1 className="font-semibold mb-10">
                          <Skeleton className="h-4 w-[250px]" />
                        </h1>
                        <span className="flex flex-col gap-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </span>
                        <ul className="flex items-center justify-start gap-3 mt-5">
                          <li className="flex items-center justify-center">
                            <Skeleton className="h-4 w-[50px]" />
                          </li>
                          <li className="flex gap-1 items-center justify-center">
                            <Skeleton className="h-4 w-[50px]" />
                          </li>
                        </ul>
                      </div>
                      {/*END CONTENT RIGHT CARD */}
                    </span>
                  </div>
                ))}
            </div>
            {/* END SEKELETON */}

            {ongoingAnimes?.map((anime, index) => (
              <span
                class="flex gap-4 max-w-[25rem]"
                key={index}>
                {/* CARD */}
                <NavLink to={anime.link}>
                  <Card
                    className="w-[145px] h-[200px] hover:scale-105 transition-all transform duration-300 ease-in-out"
                    style={{
                      backgroundImage: `url(${anime.image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}></Card>
                </NavLink>
                {/* END CARD */}

                {/* CONTENT RIGHT CARD */}
                <div className="text-wrap max-w-[250px]">
                  <h1 className="font-semibold">{anime.title}</h1>
                  <p className="text-xs my-2 ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis aliquam officiis veritatis enim architecto reprehenderit nostrum minus animi harum ducimus error, laudantium eos repudiandae,
                    laboriosam in iste cum tempore tempora.
                  </p>
                  <ul className="flex items-center justify-start gap-3 mt-5">
                    <li className="flex items-center justify-center">
                      <i class="bx bx-play"></i>
                      <small>{anime.episode}</small>
                    </li>
                    <li className="flex gap-1 items-center justify-center">
                      <i class="bx bxs-calendar"></i>
                      <small>
                        {anime.date_release} - {anime.day_release}
                      </small>
                    </li>
                  </ul>
                </div>
                {/*END CONTENT RIGHT CARD */}
              </span>
            ))}
          </div>
        </span>
        {/* END ONGOING */}

        {/* MOVIE */}
        <span className="container bg-gray-900 rounded-lg pb-5 my-5">
          <h1 className="font-bold text-xl py-2">Anime Movie</h1>

          <div className="flex gap-5 flex-wrap justify-center items-center">
            <h1 className="text-5xl font-bold">-- TODO --</h1>
          </div>
        </span>
        {/* END MOVIE */}
      </div>
    </>
  );
};

export default Home;
