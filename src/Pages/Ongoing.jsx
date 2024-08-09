import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

import React, { useState, useEffect } from "react";
import { useStateContext } from "@/context/contextProviders";
import { NavLink } from "react-router-dom";

const Ongoing = () => {
  // CONTEXT PROVIDER
  const { ongoingAll } = useStateContext();

  const [ongoingAllAnimes, setOngoingAllAnimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ongoingAll.length == 0 || ongoingAll == undefined ? setIsLoading(true) : setIsLoading(false);

    if (ongoingAll.length > 0) {
      setOngoingAllAnimes(ongoingAll);
    }
  }, [ongoingAll]);

  const ITEMS_PER_PAGE = 24;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(ongoingAllAnimes.length / ITEMS_PER_PAGE);
  const currentItems = ongoingAllAnimes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <div className="container min-h-[80vh] pt-20 pb-5 flex flex-col gap-5 items-center justify-center">
        {/* ONGOING */}
        <span className="container bg-gray-900 rounded-lg pb-5">
          <div className="flex items-center justify-start gap-2">
            <NavLink
              to={"/neko-stream/home"}
              className={"flex items-center justify-center pt-0.5"}>
              <i className="bx bx-chevron-left text-xl"></i>
            </NavLink>
            <h1 className="font-bold text-xl py-5">Anime Ongoing</h1>
          </div>

          <div className="flex gap-5 flex-wrap justify-center items-center">
            {/* SEKELETON */}
            <div className="flex gap-5 flex-wrap justify-center items-center">
              {isLoading &&
                Array.from({ length: 12 }).map((_, index) => (
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

            {currentItems.map((anime, index) => (
              <span
                className="flex gap-4 max-w-[25rem]"
                key={index}>
                {/* CARD */}
                <NavLink to={`/neko-stream/detail/${anime.link}/${anime.episode}`}>
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
                      <i className="bx bx-play"></i>
                      <small>{anime.episode}</small>
                    </li>
                    <li className="flex gap-1 items-center justify-center">
                      <i className="bx bxs-calendar"></i>
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

        {/* PAGINATION */}
        {!isLoading && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "hidden" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "hidden" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
        {/* END PAGINATION */}
      </div>
    </>
  );
};

export default Ongoing;
