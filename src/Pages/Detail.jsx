import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "@/axios";

import { Card } from "@/components/ui/card";
import Informations from "./details/Informations";
import Downloads from "./details/Downloads";
import Episodes from "./details/Episodes";

const Details = () => {
  const { title, episode } = useParams();
  const [animeDetails, setAnimeDetails] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [isPlaying, setIsPlaying] = useState([]);
  const [downloads, setDownloads] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isWhaching, setIsWhaching] = useState(false);

  const [episodeSelected, setEpisodeSelected] = useState(episode.replace(/%20/g, " "));
  const [episodeSelectedLink, setEpisodeSelectedLink] = useState("");

  const [episodeBacth, setEpisodeBacth] = useState([]);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setIsLoading(() => !isLoading);
        const response = await axiosClient.get(`/${title}/details`);
        setAnimeDetails(response.data.data);

        if (response.data.data[0].episodes.some((episode) => episode.link.includes("https://otakudesu.cloud/episode/"))) {
          const filteredEpisodes = response.data.data[0].episodes.filter((episode) => episode.link.includes("https://otakudesu.cloud/episode/"));

          // Reverse urutan episodes
          const sortedEpisodes = filteredEpisodes.reverse();
          const epsdSum = sortedEpisodes.length;

          // Set state dengan episodes yang sudah difilter dan di-reverse
          setEpisodes(sortedEpisodes);

          // Set episode terakhir dalam sortedEpisodes sebagai episode terpilih
          setEpisodeSelectedLink(sortedEpisodes[epsdSum - 1].link.replace("https://otakudesu.cloud/episode/", "").replace("/", ""));
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(() => isLoading);
      }
    };

    fetchAnimeDetails();
  }, []);

  const handleClickEpisode = (episode, link) => () => {
    setEpisodeSelected(episode.replace(/%20/g, " "));
    try {
      if (link.includes("https://otakudesu.cloud/episode/")) {
        setEpisodeSelectedLink(link.replace("https://otakudesu.cloud/episode/", "").replace("/", ""));
      } else {
        setEpisodeSelectedLink(link.replace("https://otakudesu.cloud/batch/", "").replace("/", ""));
      }
    } catch (err) {
      console.log(err.response.status);
    }
  };

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        setIsWhaching(() => !isWhaching);
        const response = await axiosClient.get(`/${title}/${episodeSelectedLink}`);
        setIsPlaying(response.data.data);
      } catch (err) {
        console.log(err.response.status);
      } finally {
        setIsWhaching(() => isWhaching);
      }
    };

    const fetchDownloads = async () => {
      try {
        const response = await axiosClient.get(`/${title}/${episodeSelectedLink}/downloads`);
        setDownloads(response.data.data);
      } catch (err) {
        console.log(err.response.status);
      }
    };

    fetchDownloads();
    fetchEpisode();
  }, [episodeSelectedLink]);

  return (
    <>
      <div className="px-3 lg:px-0 lg:container min-h-[95vh] pt-16 pb-5 flex flex-col gap-5 items-center justify-center">
        {/* LOADING */}
        {isLoading && (
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-400"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-700 animate-spin"></div>
          </div>
        )}
        {/* END LOADING */}

        {/* DETAILS */}
        {animeDetails?.map((anime, index) => (
          <span
            className="w-full flex flex-col gap-5 items-center justify-center pt-5"
            key={index}>
            <div className="lg:w-3/4 bg-gray-900 rounded-lg">
              <div className="py-5 ps-5">
                <h1 className="font-bold text-xl">{anime.Judul}</h1>
                <small>({anime.Japanese})</small>
              </div>

              <div className="flex flex-wrap justify-start items-center px-5 gap-5">
                <Card
                  className="w-[175px] h-[250px]"
                  style={{
                    backgroundImage: `url(${anime.img_link})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}></Card>

                {/* INFORMARION */}
                <span className="flex gap-2">
                  <Informations anime={anime} />
                </span>
                {/* END INFORMARION */}
              </div>

              {/* SINOPSIS */}
              <p className="py-5 px-5 w-full text-wrap">
                {anime.sinopsis.length > 0 && (
                  <>
                    <strong>Sinopsis</strong>&nbsp;&nbsp;&nbsp;&nbsp;: <br />
                    <small>{anime.sinopsis}</small>
                  </>
                )}
              </p>
              {/* END SINOPSIS */}
            </div>

            {/* CHAPTERS */}
            <div className="w-full px-3 lg:w-3/4">
              <h2 className="text-lg font-bold">Episode &nbsp;:</h2>
              <Episodes
                episodes={episodes}
                episodeSelected={episodeSelected}
                handleClickEpisode={handleClickEpisode}
              />
            </div>
            {/* END CHAPTERS */}
          </span>
        ))}
        {/* END DETAILS */}

        {/* PLAYER */}
        {!isLoading && (
          <div className="w-full lg:w-[55rem] bg-gray-900 rounded-lg">
            <span className=" py-5 px-5 items-center justify-between flex gap-5">
              <h1 className="text-sm lg:text-lg font-semibold">
                {episodeSelected} : <small>{title}</small>
              </h1>
              <span className="px-5 py-1 bg-gray-500 rounded-md">
                <p className="text-xs lg:text-sm font-semibold">360p</p>
              </span>
            </span>

            {isWhaching ? (
              <div className="flex items-center justify-center space-x-2 w-full h-[35rem]">
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-gray-700"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-gray-700"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-gray-700"></div>
              </div>
            ) : (
              <span>
                <div className="flex justify-center items-center">
                  <iframe
                    src={isPlaying[0]?.link}
                    className="w-full h-[14rem] lg:h-[30rem]"
                    allowFullScreen
                    title="Video Player"></iframe>
                </div>

                {/* TODO */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 p-5">
                  {uniqueResolutions.map((resolution, index) => (
                    <span
                      className="px-5 py-2 grow text-center bg-gray-800 rounded-lg"
                      key={index}>
                      {resolution}
                    </span>
                  ))}
                  <span className="rounded-lg grid gap-2">
                    {isPlaying
                      .filter((player) => player.resolution === "360p")
                      .map((player, index) => (
                        <button
                          className="grow text-center bg-black rounded-lg px-5 py-2"
                          key={index}>
                          {player.provider}
                        </button>
                      ))}
                  </span>
                  <span className="rounded-lg grid gap-2">
                    {isPlaying
                      .filter((player) => player.resolution === "480p")
                      .map((player, index) => (
                        <button
                          className="grow text-center bg-black rounded-lg px-5 py-2"
                          key={index}>
                          {player.provider}
                        </button>
                      ))}
                  </span>
                  <span className="rounded-lg grid gap-2">
                    {isPlaying
                      .filter((player) => player.resolution === "720p")
                      .map((player, index) => (
                        <button
                          className="grow text-center bg-black rounded-lg px-5 py-2"
                          key={index}>
                          {player.provider}
                        </button>
                      ))}
                  </span>
                </div> */}
              </span>
            )}
          </div>
        )}
        {/* END PLAYER */}

        {/* DOWNLOADS */}
        {!isLoading && !isWhaching && <Downloads downloads={downloads} />}
      </div>
    </>
  );
};

export default Details;
