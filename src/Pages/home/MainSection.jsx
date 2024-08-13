import React from "react";
import { NavLink } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import MainComponent from "@/components/MainComponent";

const MainSection = ({ link, title, isLoading, animesData, length }) => {
  return (
    <div className="bg-gray-900 rounded-lg py-5 px-5 ">
      <span className="flex justify-between items-center pb-5">
        {isLoading ? (
          <Skeleton className="w-[200px] h-[20px]"></Skeleton>
        ) : (
          <>
            <h1 className="font-bold text-xl">{title}</h1>
            <NavLink
              to={`/neko-stream/${link}`}
              className={`border-b-2 border-gray-700`}>
              <small className="text-sm ">Tampilkan Lebih</small>
            </NavLink>
          </>
        )}
      </span>

      <MainComponent
        isLoading={isLoading}
        length={length}
        animesData={animesData}
        grid="grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5"
      />
    </div>
  );
};

export default MainSection;
