import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useStateContext } from "@/context/contextProviders";
import { NavLink } from "react-router-dom";
import AnimeCard from "@/components/AnimeCard";
import AnimeSkeleton from "@/components/AnimeSekeleton";
import MainComponent from "@/components/MainComponent";
import SubSection from "./SubSection";

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
      <div className="px-3 lg:px-0 lg:container min-h-[94.5vh] pt-20 pb-5 flex flex-col gap-3 lg:gap-5 items-center justify-center">
        {/* ONGOING */}
        <SubSection
          title="Anime Ongoing"
          isLoading={isLoading}
          animesData={currentItems}
          length={{ sm: 6, lg: 16 }}
        />
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
