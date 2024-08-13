import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { useStateContext } from "@/context/contextProviders";
import SubSection from "./SubSection";

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
      <div className="px-3 lg:px-0 lg:container min-h-[94.5vh] pt-20 pb-5 flex flex-col gap-3 lg:gap-5 items-center justify-center">
        {/* BATCH */}
        <SubSection
          title="Anime Batch"
          isLoading={isLoading}
          animesData={currentItems}
          length={{ sm: 6, lg: 16 }}
        />
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
