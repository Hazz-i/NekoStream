import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Episodes = ({ episodes, episodeSelected, handleClickEpisode }) => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-5 py-5">
      {episodes.map((episode, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleClickEpisode(episode.title, episode.link)}
                className={`px-5 py-2 rounded-lg text-center hover:bg-gray-950 transition-all ease-in-out duration-300 ${episode.title == episodeSelected ? "bg-gray-900 text-gray-400 " : "bg-gray-800 text-white"}`}
                disabled={episode.title == episodeSelected}>
                {episode.title}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{episode.release_date.replace(",", " ")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default Episodes;
