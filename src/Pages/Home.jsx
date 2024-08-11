import Header from "@/components/layout/Header";

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "@/context/contextProviders";
import AnimeCard from "@/components/AnimeCard";
import AnimeSkeleton from "@/components/AnimeSekeleton";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

const Home = () => {
  // CONTEXT PROVIDER
  const { ongoingHome, ongoingAll, batchHome, topAnimeList } = useStateContext();

  const [ongoingAnimes, setOngoingAnimes] = useState([]);
  const [batchAnime, setBatchAnime] = useState([]);
  const [topAnimeLists, setTopAnmieLists] = useState([]);
  const [allAnimes, setAllAnimes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [animeSearch, setAnimeSearch] = useState([]);

  useEffect(() => {
    ongoingHome.length == 0 || topAnimeList.length == 0 || batchHome.length == 0 ? setIsLoading(true) : setIsLoading(false);

    if (ongoingHome.length > 0 && topAnimeList.length > 0 && batchHome.length > 0) {
      setOngoingAnimes(ongoingHome);
      setBatchAnime(batchHome);
      setTopAnmieLists(topAnimeList);
      setAllAnimes([...batchHome, ...ongoingAll]);
    }
  }, [ongoingHome, topAnimeList, batchHome]);

  useEffect(() => {
    const searchAnime = allAnimes.filter((anime) => anime.title.toLowerCase().includes(search.toLowerCase()));
    setAnimeSearch(searchAnime);
  }, [search]);

  return (
    <>
      <Header />
      <div className="container min-h-[95vh] pt-20 pb-5 flex justify-start items-start gap-5">
        {search.length == 0 ? (
          <span className="flex flex-col gap-5 w-[60rem]">
            {/* ONGOING */}
            <div className="bg-gray-900 rounded-lg py-5 px-5">
              <span className="flex justify-between items-center pb-5">
                {isLoading ? (
                  <Skeleton className="w-[200px] h-[20px]"></Skeleton>
                ) : (
                  <>
                    <h1 className="font-bold text-xl">Anime Ongoing</h1>
                    <NavLink
                      to={"/neko-stream/ongoing-all"}
                      className={`border-b-2 border-gray-700`}>
                      <small className="text-sm ">Tampilkan Lebih</small>
                    </NavLink>
                  </>
                )}
              </span>

              <span className="flex gap-5 flex-wrap justify-center items-center">
                {/* SEKELETON */}
                <AnimeSkeleton
                  isLoading={isLoading}
                  length={10}
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

            {/* BATCH */}
            <span className="bg-gray-900 rounded-lg py-5 px-5">
              <span className="flex justify-between items-center pb-5">
                {isLoading ? (
                  <Skeleton className="w-[200px] h-[20px]"></Skeleton>
                ) : (
                  <>
                    <h1 className="font-bold text-xl">Anime Batch</h1>
                    <NavLink
                      to={"/neko-stream/batch-all"}
                      className={`border-b-2 border-gray-700`}>
                      <small className="text-sm ">Tampilkan Lebih</small>
                    </NavLink>
                  </>
                )}
              </span>

              <span className="flex gap-5 flex-wrap justify-center items-center">
                {/* SEKELETON */}
                <AnimeSkeleton
                  isLoading={isLoading}
                  length={5}
                />
                {/* END SEKELETON */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
                  {batchAnime?.map((anime, index) => (
                    <span
                      className="flex gap-4"
                      key={index}>
                      <AnimeCard anime={anime} />
                    </span>
                  ))}
                </div>
              </span>
            </span>
            {/* END BATCH */}
          </span>
        ) : (
          <div className="bg-gray-900 rounded-lg py-5 px-5 w-[60rem]">
            <h1 className="text-lg pb-5">
              Hasil Pencarian dari - <span className="font-semibold">{search}</span>
            </h1>
            {animeSearch.length == 0 && (
              <span className="w-full flex items-center justify-center">
                <h1 className="text-lg font-semibold">Anime Tidak Ditemukan</h1>
              </span>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
              {animeSearch?.map((anime, index) => (
                <span
                  className="flex gap-4"
                  key={index}>
                  <AnimeCard anime={anime} />
                </span>
              ))}
            </div>
          </div>
        )}

        {/* SEARCH */}
        <span className="grid gap-2">
          {!isLoading && (
            <div className="grid gap-2">
              <h1 className="font-bold text-xl">Cari Tier Anime</h1>
              <span className="flex grow items-center space-x-2">
                <Input
                  type="serach"
                  placeholder="Ketikan anime yang anda cari..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </span>
            </div>
          )}
          {/* END SEARCH */}

          {/* TOP ANIME LIST */}
          <div className="grow flex flex-col">
            {!isLoading ? (
              <span className="flex justify-between items-center py-5">
                <h1 className="font-bold text-xl">Top Anime List</h1>
                <small className="text-gray-700 font-semibold">by MyAnimeList</small>
              </span>
            ) : (
              <span className="flex justify-between items-center py-5">
                <Skeleton className="w-[200px] h-[20px]"></Skeleton>
                <Skeleton className="w-[100px] h-[20px]"></Skeleton>
              </span>
            )}
            <span className="grid grid-cols-1 gap-5 py-5 px-5 bg-gray-900 rounded-lg">
              {isLoading && (
                <div className="flex gap-4 min-w-[30rem]">
                  <div className="flex items-center justify-center">
                    <Skeleton className={"h-4 w-2"}></Skeleton>
                  </div>

                  <Skeleton className="w-[50px] h-[75px] "></Skeleton>
                  <span className="flex flex-col justify-between">
                    <Skeleton className="w-[230px] h-[20px]"></Skeleton>
                    <div className="grid gap-1">
                      <Skeleton className="w-[100px] h-[20px]"></Skeleton>
                      <Skeleton className="w-[100px] h-[20px]"></Skeleton>
                    </div>
                  </span>
                </div>
              )}

              {topAnimeLists?.map((list, index) => (
                <NavLink
                  to={"https://myanimelist.net/topanime.php?type=bypopularity"}
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`${list.image_url}`, "_blank", "noopener noreferrer");
                  }}
                  className={"flex gap-4"}
                  key={index}>
                  <div className="flex items-center justify-center">{list.ranking}</div>
                  <Card
                    className="w-[50px] h-[75px] transition-all duration-300 ease-in-out hover:scale-105 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${list.image_url})`,
                    }}></Card>
                  <div className="flex flex-col justify-between w-[calc(100%-140px)]">
                    <h1 className="txet-wrap font-semibold">{list.title}</h1>
                    <span className="grid">
                      <small>{list.description}</small>
                      <small>Rate: {list.rating} ⭐</small>
                    </span>
                  </div>
                </NavLink>
              ))}
            </span>
          </div>
          {/* END TOP ANIME LIST */}
        </span>
      </div>
    </>
  );
};

export default Home;
