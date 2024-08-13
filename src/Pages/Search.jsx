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
          {/* {searchResult.length > 0 ? (
            <span className={`w-full grid  ${searchResult.length > 1 ? "grid-cols-2" : " "} gap-3 bg-gray-900 rounded-lg px-5 py-3`}>
              {searchResult.map((item, index) => (
                <NavLink
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`/neko-stream/detail/${item.link.replace("https://otakudesu.cloud/anime/", "").replace("/", "")}/Episode 1`, "_blank", "noopener noreferrer");
                  }}
                  className="w-full flex gap-2 hover:bg-gray-800 rounded-lg px-2 transition-all duration-300 ease-in-out group"
                  key={index}>
                  <Card
                    className="w-[100px] h-[140px] transition-all duration-300 ease-in-out group-hover:scale-105 bg-cover bg-center"
                    style={{
                      backgroundImage: ` url(${item.image})`,
                    }}></Card>
                  <span className="flex items-start justify-between flex-col py-1">
                    <h1 className="font-semibold text-white text-wrap">{item.title}</h1>

                    <div className="grid">
                      <small>
                        <span className="font-semibold">Genres&nbsp;:</span> {item.genres}
                      </small>
                      <small>
                        <span className="font-semibold">Status&nbsp;&nbsp;:</span> {item.status}
                      </small>
                      <small>
                        <span className="font-semibold">Rating&nbsp;:</span> {item.rating}
                      </small>
                    </div>
                  </span>
                </NavLink>
              ))}
            </span>
          ) : (
            <span className="w-full min-h-[80vh] flex items-center justify-center">
              <p className="text-center font-semibold text-lg">No results found </p>
            </span>
          )} */}
        </div>
      )}
    </>
  );
};

export default Search;
