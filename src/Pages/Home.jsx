import Header from "@/components/layout/Header";

import { useState, useEffect } from "react";
import { useStateContext } from "@/context/contextProviders";

import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import MainSection from "./home/MainSection";
import AnimeListSection from "./home/AnimeListSection";

const Home = () => {
  // CONTEXT PROVIDER
  const { ongoingHome, batchHome, topAnimeList } = useStateContext();

  const [ongoingAnimes, setOngoingAnimes] = useState([]);
  const [batchAnime, setBatchAnime] = useState([]);
  const [topAnimeLists, setTopAnmieLists] = useState([]);

  const [animeLists, setAnimeList] = useState([]);
  const [animeListFilter, setAnimeListFilter] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [animeSearch, setAnimeSearch] = useState([]);

  useEffect(() => {
    ongoingHome.length == 0 || topAnimeList.length == 0 || batchHome.length == 0 ? setIsLoading(true) : setIsLoading(false);

    if (ongoingHome.length > 0 && topAnimeList.length > 0 && batchHome.length > 0) {
      setOngoingAnimes(ongoingHome);
      setBatchAnime(batchHome);
      setTopAnmieLists(topAnimeList);
      setAnimeList(topAnimeList);
    }
  }, [ongoingHome, topAnimeList, batchHome]);

  useEffect(() => {
    setAnimeListFilter(topAnimeLists.slice(0, 10));
  }, [topAnimeLists]);

  useEffect(() => {
    const searchAnime = animeLists.filter((anime) => anime.title.toLowerCase().includes(search.toLowerCase()));
    setAnimeSearch(searchAnime);
  }, [search]);

  return (
    <div className="px-3 lg:px-0 lg:container min-h-[94.5vh] pt-20 pb-5 flex flex-col md:flex-row justify-start items-start lg:gap-5 gap-3">
      <span className="flex flex-col gap-5 w-full lg:w-[60rem]">
        {/* ONGOING */}
        <MainSection
          isLoading={isLoading}
          animesData={ongoingAnimes}
          length={{ sm: 4, lg: 5 }}
          title="Anime Ongoing"
          link="ongoing-all"
        />
        {/* END ONGOING */}

        {/* BATCH */}
        <MainSection
          isLoading={isLoading}
          animesData={batchAnime}
          length={{ sm: 2, lg: 5 }}
          title="Anime Batch"
          link="batch-all"
        />
        {/* END BATCH */}
      </span>

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
        <div className="w-full lg:w-[25rem] flex flex-col">
          {!isLoading ? (
            <span className="flex justify-between items-center py-5">
              <h1 className="font-bold text-xl">Top Anime List</h1>
              <small className="text-gray-700 font-semibold">by MyAnimeList</small>
            </span>
          ) : (
            <span className="flex justify-between items-center py-5">
              <Skeleton className="w-[150px] h-[10px] lg:w-[200px] lg:h-[20px]"></Skeleton>
              <Skeleton className="w-[50px] h-[10px] lg:w-[100px] lg:h-[20px]"></Skeleton>
            </span>
          )}

          <span className="grid grid-cols-1 gap-5 py-5 px-5 bg-gray-900 rounded-lg">
            {isLoading && (
              <div className="flex gap-4">
                <div className="flex items-center justify-center">
                  <Skeleton className={"h-4 w-2"}></Skeleton>
                </div>

                <Skeleton className="w-[50px] h-[75px] "></Skeleton>
                <span className="flex flex-col justify-between">
                  <Skeleton className="w-[230px] h-[10px] lg:h-[20px]"></Skeleton>
                  <div className="grid gap-1">
                    <Skeleton className="w-[150px] h-[10px] lg:h-[20px]"></Skeleton>
                    <Skeleton className="w-[100px] h-[10px] lg:h-[20px]"></Skeleton>
                  </div>
                </span>
              </div>
            )}

            {search.length != 0 ? (
              animeSearch.length == 0 ? (
                <small className="text-center font-semibold">Anime Tidak di Temukan</small>
              ) : (
                <AnimeListSection animesData={animeSearch} />
              )
            ) : (
              <AnimeListSection animesData={animeListFilter} />
            )}
          </span>
        </div>
        {/* END TOP ANIME LIST */}
      </span>
    </div>
  );
};

export default Home;
