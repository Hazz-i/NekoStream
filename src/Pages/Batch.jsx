import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { useStateContext } from "@/context/contextProviders";
import { NavLink } from "react-router-dom";
import AnimeCard from "@/components/AnimeCard";
import AnimeSkeleton from "@/components/AnimeSekeleton";

const Batch = () => {
  const { batchAll } = useStateContext();
  const [ongoingAllAnimes, setOngoingAllAnimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { page } = useParams();
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 40;
  const currentPage = parseInt(page) || 1;

  useEffect(() => {
    setIsLoading(batchAll.length === 0 || batchAll === undefined);
    if (batchAll.length > 0) {
      setOngoingAllAnimes(batchAll);
    }
  }, [batchAll]);

  const totalPages = Math.ceil(ongoingAllAnimes.length / ITEMS_PER_PAGE);
  const currentItems = ongoingAllAnimes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    navigate(`/neko-stream/batch-all/${newPage}`);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPageNumbersToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    if (endPage - startPage + 1 < maxPageNumbersToShow) {
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    if (startPage > 1) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pages.push(
          <PaginationItem key="startEllipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === currentPage}
            onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <PaginationItem key="endEllipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <>
      <div className="container min-h-[95vh] pt-20 pb-5 flex flex-col gap-5 items-center justify-center">
        {/* BATCH */}
        <span className="container bg-gray-900 rounded-lg pb-5">
          <div className="flex items-center justify-start gap-2">
            <NavLink
              to="/neko-stream/home"
              className="flex items-center justify-center pt-0.5">
              <i className="bx bx-chevron-left text-xl"></i>
            </NavLink>
            <h1 className="font-bold text-xl py-5">Anime Batch</h1>
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
        {/* END BATCH */}

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
              {renderPageNumbers()}
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

export default Batch;
