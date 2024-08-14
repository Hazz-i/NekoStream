import React from "react";
import { NavLink } from "react-router-dom";
import { Card } from "@/components/ui/card";

const AnimeListSection = ({ animesData }) => {
  return (
    <>
      {animesData.map((list, index) => (
        <NavLink
          to={"https://myanimelist.net/topanime.php?type=bypopularity"}
          onClick={(e) => {
            e.preventDefault();
            window.open(`https://myanimelist.net/topanime.php?type=bypopularity`, "_blank", "noopener noreferrer");
          }}
          className="flex gap-4 group"
          key={index}>
          <div className="flex items-center justify-center">{list.ranking}</div>
          <Card
            className="w-[50px] h-[75px] transition-all duration-300 ease-in-out group-hover:scale-105 bg-cover bg-center"
            style={{
              backgroundImage: `url(${list.image_url})`,
            }}></Card>
          <div className="flex flex-col justify-between w-[calc(100%-140px)]">
            <h1 className="text-wrap font-semibold text-sm">{list.title}</h1>
            <span className="grid">
              <small>
                {list.data_range}&nbsp;&nbsp; ({list.description})
              </small>
              <small>Rate: {list.rating} ⭐</small>
            </span>
          </div>
        </NavLink>
      ))}
    </>
  );
};

export default AnimeListSection;
