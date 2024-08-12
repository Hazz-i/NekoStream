import { useEffect, useState } from "react";
import { useStateContext } from "@/context/contextProviders";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

import axiosClient from "@/axios";
import { NavLink, useNavigate } from "react-router-dom";

const Genre = () => {
  const { animeGenres } = useStateContext();

  const [genres, setGenres] = useState([]);
  const [listAnimes, setListAnimes] = useState([]);
  const [pages, setPages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isListAnimeLoading, setIsListAnimeLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [greneSelected, setGreneSelected] = useState("Action");

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(animeGenres.length === 0 || animeGenres === undefined);

    setGenres(animeGenres);
  }, [animeGenres]);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        navigate(`/neko-stream/genre/${greneSelected}/${page}`);
        setIsListAnimeLoading(true);
        const response = await axiosClient.get(`/genres/${greneSelected.toLocaleLowerCase()}/${page}`);
        const { genre_data, genre_pages } = response.data.data;
        setListAnimes(genre_data);
        setPages(genre_pages);
      } catch (error) {
        console.log(error.response.status);
      } finally {
        setIsListAnimeLoading(false);
      }
    };

    fetchAnimeList();
  }, [greneSelected, page]);

  useEffect(() => {
    setPage(1);
  }, [greneSelected]);

  return (
    <>
      {isLoading ? (
        <span className="flex items-center justify-center h-[95vh]">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-400"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-700 animate-spin"></div>
          </div>
        </span>
      ) : (
        <div className="min-h-[95vh] container pt-20 pb-5 flex flex-col gap-3 items-start justify-start">
          {/* GENRE LIST*/}
          <div className="w-full flex items-center justify-between gap-3">
            <h1 className="font-bold text-xl">Anime Grene List</h1>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Pilih Grene</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 h-[50rem] overflow-y-scroll">
                <DropdownMenuLabel>Anime Grenes</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={greneSelected}
                  onValueChange={setGreneSelected}>
                  {genres.map((genre, index) => {
                    return (
                      <DropdownMenuRadioItem
                        value={`${genre.title}`}
                        key={index}>
                        {genre.title}
                      </DropdownMenuRadioItem>
                    );
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* END GENRE LIST*/}

          {/* GENRE*/}
          <span className="flex flex-col justify-center items-center bg-gray-900 rounded-lg gap-5 p-5 min-w-full min-h-[40vh]">
            {!isListAnimeLoading && (
              <span className="flex items-center justify-start w-full">
                <h1 className="text-lg">
                  Daftar Anime Grene "<span className="font-semibold">{greneSelected}</span>"
                </h1>
              </span>
            )}
            {isListAnimeLoading ? (
              <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-5">
                {listAnimes?.map((anime, index) => {
                  return (
                    <NavLink
                      key={index}
                      className="flex gap-2 group"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`/neko-stream/detail/${anime.link.replace("https://otakudesu.cloud/anime/", "").replace("/", "")}/Episode 1`, "_blank", "noopener noreferrer");
                      }}>
                      <Card
                        className="w-[145px] h-[200px] transition-all duration-300 ease-in-out group-hover:scale-105 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${anime.img_url})`,
                        }}></Card>
                      <div className="flex flex-col justify-between items-start py-1 text-wrap max-w-[25rem]">
                        <span className="grid">
                          <h1 className="font-semibold">{anime.title}</h1>
                          <small className="font-thin">
                            ({anime.anime_date} - {anime.epsd})
                          </small>
                        </span>
                        <p className="grid">
                          <small className="text-sm">
                            <b>Studio</b> : {anime.studio}
                          </small>
                          <small className="text-sm">
                            <b>Genres</b> : {anime.genre}
                          </small>
                        </p>
                      </div>
                    </NavLink>
                  );
                })}
              </div>
            )}
          </span>
          {/* END GENRE*/}
          {!isListAnimeLoading && (
            <Pagination>
              <PaginationContent>
                {/* Handling the 'Berikutnya »' button */}
                {pages
                  .filter((animePage) => animePage.page.toLowerCase().includes("sebelumnya"))
                  .map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationPrevious onClick={() => setPage(parseInt(page) - 1)} />
                    </PaginationItem>
                  ))}

                {pages
                  .filter((animePage) => !animePage.page.toLowerCase().includes("berikutnya") && !animePage.page.toLowerCase().includes("sebelumnya"))
                  .map((animePage, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={parseInt(page) === parseInt(animePage.page)}
                        onClick={() => (animePage.page !== "…" ? setPage(animePage.page) : " ")}>
                        {animePage.page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                {/* Handling the 'Berikutnya »' button */}
                {pages
                  .filter((animePage) => animePage.page.toLowerCase().includes("berikutnya"))
                  .map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationNext onClick={() => setPage(parseInt(page) + 1)} />
                    </PaginationItem>
                  ))}
              </PaginationContent>
            </Pagination>
          )}
          {/* END PAGINATION */}
        </div>
      )}
    </>
  );
};

export default Genre;
