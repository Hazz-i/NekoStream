import React from "react";
import AnimeCard from "./AnimeCard";
import AnimeSkeleton from "./AnimeSekeleton";

const MainComponent = ({ isLoading, length, animesData }) => {
  return (
    <span className="flex gap-5 flex-wrap justify-center items-center">
      {/* SEKELETON */}

      <AnimeSkeleton
        isLoading={isLoading}
        length={length}
      />
      {/* END SEKELETON */}

      {animesData?.map((anime, index) => (
        <span
          className="flex gap-4"
          key={index}>
          <AnimeCard anime={anime} />
        </span>
      ))}
    </span>
  );
};

export default MainComponent;
