import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useStateContext } from "@/context/contextProviders";
import { NavLink } from "react-router-dom";
import AnimeCard from "@/components/AnimeCard";
import AnimeSkeleton from "@/components/AnimeSekeleton";

const Ongoing = () => {
  const { ongoingAll } = useStateContext();
  const [ongoingAllAnimes, setOngoingAllAnimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { page } = useParams();
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 40;
  const currentPage = parseInt(page) || 1;

  useEffect(() => {
    setIsLoading(ongoingAll.length === 0 || ongoingAll === undefined);
    if (ongoingAll.length > 0) {
      setOngoingAllAnimes(ongoingAll);
    }
  }, [ongoingAll]);

  const totalPages = Math.ceil(ongoingAllAnimes.length / ITEMS_PER_PAGE);
  const currentItems = ongoingAllAnimes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    navigate(`/neko-stream/ongoing-all/${newPage}`);
  };

  return (
    <>
      <div className="container min-h-[95vh] pt-20 pb-5 flex flex-col gap-5 items-center justify-center">
        {/* ONGOING */}
        <span className="container bg-gray-900 rounded-lg pb-5">
          <div className="flex items-center justify-start gap-2">
            <NavLink
              to="/neko-stream/home"
              className="flex items-center justify-center pt-0.5">
              <i className="bx bx-chevron-left text-xl"></i>
            </NavLink>
            <h1 className="font-bold text-xl py-5">Anime Ongoing</h1>
          </div>

          <div className="flex gap-5 flex-wrap justify-center items-center">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-5">
                <AnimeSkeleton
                  isLoading={isLoading}
                  length={32}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-5">
                {currentItems.map((anime, index) => (
                  <AnimeCard
                    key={index}
                    anime={anime}
                  />
                ))}
              </div>
            )}
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
