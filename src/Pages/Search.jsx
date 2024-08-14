import { useSearch } from "@/context/searchProvier";
import { NavLink, useParams } from "react-router-dom";

import { Card } from "@/components/ui/card";
import SubComponent from "@/components/SubComponent";

const Search = () => {
  const { query } = useParams();
  const { searchResult, isSearch } = useSearch();

  return (
    <>
      {isSearch ? (
        <span className="h-[95vh] w-full flex items-center justify-center">
          <div className="relative ">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-400"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-700 animate-spin"></div>
          </div>
        </span>
      ) : (
        <div className="container pt-20 pb-5 min-h-[95vh] flex flex-col justify-start items-start gap-2 ">
          <h1 className="ps-5">
            <span className="font-semibold">{searchResult.length}</span> Results for "<span className="font-semibold">{query}</span>"
          </h1>
          <SubComponent
            animesData={searchResult}
            subTitle="Genres"
            subTitle1="Status"
            subTitle2="Rating"
          />
        </div>
      )}
    </>
  );
};

export default Search;
