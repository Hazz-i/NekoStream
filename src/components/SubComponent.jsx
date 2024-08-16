import React from "react";
import { NavLink } from "react-router-dom";
import { Card } from "./ui/card";

const SubComponent = ({ animesData, subTitle, subTitle1, subTitle2 }) => {
  return (
    <>
      {animesData.length > 0 ? (
        <span className={`w-full grid  ${animesData.length > 1 ? "grid-cols-1 lg:grid-cols-2" : ""} gap-3 bg-gray-900 rounded-lg px-5 py-3`}>
          {animesData.map((anime, index) => (
            <NavLink
              onClick={(e) => {
                e.preventDefault();
                window.open(`/neko-stream/detail/${anime.link.replace("https://otakudesu.cloud/anime/", "").replace("/", "")}/Episode 1`, "_blank", "noopener noreferrer");
              }}
              className="w-full flex gap-2 lg:hover:bg-gray-800 rounded-lg px-2 transition-all duration-300 ease-in-out group"
              key={index}>
              <Card
                className="min-w-[100px] min-h-[140px] transition-all duration-300 ease-in-out group-hover:scale-105 bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${anime.image ? anime.image : anime.img_url})`,
                }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent opacity-100 lg:opacity-0 flex flex-col justify-start items-center p-1">
                  <small className="font-semibold text-white">{anime.title.split(" ").slice(0, 5).join(" ")}</small>
                </div>
              </Card>
              <span className="flex items-start justify-end lg:justify-between flex-col py-1 text-wrap">
                <span className="hidden lg:flex font-semibold">
                  <h1>
                    {anime.title}
                    {anime.epsd ? <small className="font-thin">- ({anime.epsd}) </small> : ""}
                  </h1>
                </span>

                <div className="grid text-wrap">
                  <small>
                    <span className="font-semibold">{subTitle}&nbsp;:</span> {anime.genre !== undefined ? anime.genre.split(",").join(", ") : anime.genres !== undefined ? anime.genres.split(",").join(", ") : "-"}
                  </small>
                  <small>
                    <span className="font-semibold">{subTitle1}&nbsp;&nbsp;:</span> {anime.status !== undefined ? anime.status : anime.studio !== undefined ? anime.studio : "-"}
                  </small>
                  <small>
                    <span className="font-semibold">{subTitle2}&nbsp;:</span> {anime.anime_date !== undefined ? anime.anime_date : anime.rating !== undefined ? anime.rating : "-"}
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
      )}
    </>
  );
};

export default SubComponent;
