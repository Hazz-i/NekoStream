import React from "react";
import AnimeCard from "./AnimeCard";
import AnimeSkeleton from "./AnimeSekeleton";

const MainComponent = ({ isLoading, length, animesData, grid }) => {
  return (
    <span className="flex gap-5 flex-wrap justify-center items-center">
      {/* SEKELETON */}
      <div className={`grid ${grid} gap-5`}>
        <AnimeSkeleton
          isLoading={isLoading}
          length={length}
        />
        {/* END SEKELETON */}
      </div>

      <div className={`grid ${grid} gap-5`}>
        {animesData?.map((anime, index) => (
          <span
            className="flex gap-4"
            key={index}>
            <AnimeCard anime={anime} />
          </span>
        ))}
      </div>
    </span>
  );
};

export default MainComponent;
