import React from "react";
import { NavLink } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import MainComponent from "@/components/MainComponent";

const MainSection = ({ link, title, isLoading, animesData, length }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-5">
      <span className="flex justify-between items-center pb-5">
        {isLoading ? (
          <Skeleton className="w-[100px] h-[10px] lg:w-[200px] lg:h-[20px]"></Skeleton>
        ) : (
          <>
            <h1 className="font-semibold lg:font-bold lg:text-xl">{title}</h1>
            <NavLink
              to={`/neko-stream/${link}`}
              className={`border-b-2 border-gray-700`}>
              <small className="lg:hidden">Lebih Banyak</small>
              <small className="hidden lg:flex">Tampilkan Lebih</small>
            </NavLink>
          </>
        )}
      </span>

      <MainComponent
        isLoading={isLoading}
        length={length}
        animesData={animesData}
      />
    </div>
  );
};

export default MainSection;
