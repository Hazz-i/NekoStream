import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "@/axios";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

  const uniqueResolutions = [...new Set(isPlaying?.map((player) => player.resolution))];

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setIsLoading(() => !isLoading);
        const response = await axiosClient.get(`/${title}/details`);
        setAnimeDetails(response.data.data);

        if (response.data.data[0].episodes) {
          const sortedEpisodes = response.data.data[0].episodes.reverse();
          const epsdSum = sortedEpisodes.length;

          setEpisodes(sortedEpisodes);
          setEpisodeSelectedLink(response.data.data[0].episodes[epsdSum - 1].link.replace("https://otakudesu.cloud/episode/", "").replace("/", ""));
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
    setEpisodeSelectedLink(link.replace("https://otakudesu.cloud/episode/", "").replace("/", ""));
  };

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        setIsWhaching(() => !isWhaching);
        const response = await axiosClient.get(`/${title}/${episodeSelectedLink}`);
        setIsPlaying(response.data.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsWhaching(() => isWhaching);
      }
    };

    const fetchDownloads = async () => {
      try {
        const response = await axiosClient.get(`/${title}/${episodeSelectedLink}/downloads`);
        setDownloads(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchDownloads();
    fetchEpisode();
  }, [episodeSelectedLink]);

  return (
    <>
      <div className="container min-h-[95vh] pt-20 pb-5 flex flex-col gap-5 items-center justify-center">
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
            <div className="w-3/4 bg-gray-900 rounded-lg">
              <h1 className="text-xl py-5 ps-5">
                <span className="font-bold ">{anime.Judul}</span> <br />({anime.Japanese})
              </h1>

              <div className="flex flex-wrap justify-start items-center px-5 gap-5">
                <Card
                  className="w-[175px] h-[250px]"
                  style={{
                    backgroundImage: `url(${anime.img_link})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}></Card>

                {/* INFORMARION */}
                <span className="flex flex-col gap-2">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-sm">
                          <strong>Genre </strong>
                        </TableCell>
                        <TableCell>{anime.Genre ? anime.Genre : "-"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-sm">
                          <strong>Durasi </strong>
                        </TableCell>
                        <TableCell>{anime.Durasi ? anime.Durasi : "-"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-sm">
                          <strong>Produser </strong>
                        </TableCell>
                        <TableCell>{anime.Produser ? anime.Produser : "-"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-sm">
                          <strong>Status </strong>
                        </TableCell>
                        <TableCell>{anime.Status ? anime.Status : "-"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-sm">
                          <strong>Studio </strong>
                        </TableCell>
                        <TableCell>{anime.Studio ? anime.Studio : "-"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-sm">
                          <strong>Tanggal Rilis </strong>
                        </TableCell>
                        <TableCell>{anime["Tanggal Rilis"] ? anime["Tanggal Rilis"] : "-"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-sm">
                          <strong>Total Episode </strong>
                        </TableCell>
                        <TableCell>{anime["Total Episode"] ? anime["Total Episode"] : "-"}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </span>
                {/* END INFORMARION */}
              </div>

              {/* SINOPSIS */}
              <p className="py-5 px-5 w-full text-wrap">
                {anime.sinopsis.length > 0 && (
                  <>
                    <strong>Sinopsis</strong>&nbsp;&nbsp;&nbsp;&nbsp;: <br />
                    <span className="">{anime.sinopsis}</span>
                  </>
                )}
              </p>
              {/* END SINOPSIS */}
            </div>

            {/* CHAPTERS */}
            <div className="w-3/4">
              <h2 className="text-lg font-bold">Episode &nbsp;:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-5 py-5">
                {episodes.map((episode, index) => (
                  <Button
                    onClick={handleClickEpisode(episode.title, episode.link)}
                    key={index}
                    className={`px-5 py-2 rounded-lg text-center hover:bg-gray-950 transition-all ease-in-out duration-300 ${episode.title == episodeSelected ? "bg-gray-900 text-gray-400 " : "bg-gray-800 text-white"}`}
                    disabled={episode.title == episodeSelected}>
                    {episode.title}
                  </Button>
                ))}
              </div>
            </div>
            {/* END CHAPTERS */}
          </span>
        ))}
        {/* END DETAILS */}

        {/* PLAYER */}
        {!isLoading && (
          <div className="w-[55rem] bg-gray-900 rounded-lg">
            <span className="text-lg py-5 px-5 items-center justify-between flex gap-5">
              <h1 className="font-semibold">
                {episodeSelected} : <small>{title}</small>
              </h1>
              <span className="px-5 bg-gray-500 rounded-md">
                <p className="font-semibold">360p</p>
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
                    className="w-full h-[30rem]"
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
        {!isLoading && !isWhaching && (
          <>
            <div className="text-start w-[55rem] font-bold text-lg">
              <h1>Link Downloads:</h1>
            </div>

            {/* MP 4 */}
            <span className="w-[55rem] bg-gray-900 rounded-lg grid gap-5 py-5">
              <h1 className="text-lg text-center py-2 px-5 bg-gray-950 rounded-sm mx-5">
                <span className="font-bold">Mp 4</span>
              </h1>

              <div className="flex items-center justify-around">
                <span className="text-center bg-gray-800 rounded-sm px-24 py-2">
                  <h1>360p</h1>
                </span>
                <ul className="flex items-center justify-center gap-3">
                  {downloads
                    .filter((download) => download.type === "Mp4 360p")
                    .map((download, index) => (
                      <li
                        key={index}
                        className="py-2 px-5 rounded-sm text-center border-2 hover:bg-gray-500 transition-all ease-in-out duration-300 hover:text-gray-950">
                        <a
                          href={download.link}
                          target="_blank"
                          rel="noopener noreferrer">
                          {download.platform}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="flex items-center justify-around">
                <span className="text-center bg-gray-800 rounded-sm px-24 py-2">
                  <h1>480p</h1>
                </span>
                <ul className="flex items-center justify-center gap-3">
                  {downloads
                    .filter((download) => download.type === "Mp4 480p")
                    .map((download, index) => (
                      <li
                        key={index}
                        className="py-2 px-5 rounded-sm text-center border-2 hover:bg-gray-500 transition-all ease-in-out duration-300 hover:text-gray-950">
                        <a
                          href={download.link}
                          target="_blank"
                          rel="noopener noreferrer">
                          {download.platform}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="flex items-center justify-around">
                <span className="text-center bg-gray-800 rounded-sm px-24 py-2">
                  <h1>720p</h1>
                </span>
                <ul className="flex items-center justify-center gap-3">
                  {downloads
                    .filter((download) => download.type === "Mp4 720p")
                    .map((download, index) => (
                      <li
                        key={index}
                        className="py-2 px-5 rounded-sm text-center border-2 hover:bg-gray-500 transition-all ease-in-out duration-300 hover:text-gray-950">
                        <a
                          href={download.link}
                          target="_blank"
                          rel="noopener noreferrer">
                          {download.platform}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
              {/* END MP 4 */}

              {/* MKV */}
              <h1 className="text-lg text-center py-2 px-5 bg-gray-950 rounded-sm mx-5">
                <span className="font-bold">MKV</span>
              </h1>

              <div className="flex items-center justify-around">
                <span className="text-center bg-gray-800 rounded-sm px-24 py-2">
                  <h1>480p</h1>
                </span>
                <ul className="flex items-center justify-center gap-3">
                  {downloads
                    .filter((download) => download.type === "MKV 480p")
                    .map((download, index) => (
                      <li
                        key={index}
                        className="py-2 px-5 rounded-sm text-center border-2 hover:bg-gray-500 transition-all ease-in-out duration-300 hover:text-gray-950">
                        <a
                          href={download.link}
                          target="_blank"
                          rel="noopener noreferrer">
                          {download.platform}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="flex items-center justify-around">
                <span className="text-center bg-gray-800 rounded-sm px-24 py-2">
                  <h1>720p</h1>
                </span>
                <ul className="flex items-center justify-center gap-3">
                  {downloads
                    .filter((download) => download.type === "MKV 720p")
                    .map((download, index) => (
                      <li
                        key={index}
                        className="py-2 px-5 rounded-sm text-center border-2 hover:bg-gray-500 transition-all ease-in-out duration-300 hover:text-gray-950">
                        <a
                          href={download.link}
                          target="_blank"
                          rel="noopener noreferrer">
                          {download.platform}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </span>
            {/* END MKV */}
          </>
        )}
      </div>
    </>
  );
};

export default Details;
