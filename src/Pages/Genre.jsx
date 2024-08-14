import { useEffect, useState } from "react";
import { useStateContext } from "@/context/contextProviders";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

import axiosClient from "@/axios";
import { NavLink, useNavigate } from "react-router-dom";
import SubComponent from "@/components/SubComponent";

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
        <span className="flex items-center justify-center h-[94vh] lg:h-[95vh]">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-400"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-700 animate-spin"></div>
          </div>
        </span>
      ) : (
        <div className=" px-3 lg:px-0 lg:container pt-20 pb-5 flex flex-col gap-3 items-center justify-start">
          {/* GENRE LIST*/}
          <div className="w-full flex items-center justify-between gap-3">
            <h1 className="font-semibold lg:font-bold lg:text-xl">Anime Grene List</h1>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>{greneSelected}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 h-[30rem] lg:w-72 lg:h-[50rem] overflow-y-scroll">
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
          {isListAnimeLoading ? (
            <span className="flex flex-col justify-center items-center bg-gray-900 rounded-lg gap-5 p-5 min-w-full min-h-[74vh] lg:min-h-[80vh]">
              <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </span>
          ) : (
            <SubComponent
              animesData={listAnimes}
              subTitle="Genres"
              subTitle1="Studio"
              subTitle2="Info"
            />
          )}
          {/* END GENRE*/}
          {!isListAnimeLoading && (
            <Pagination>
              <PaginationContent>
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
