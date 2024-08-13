import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "@/axios";

// conextprovider
const StateContent = createContext({
  ongoingHome: {},
  batchHome: {},
  topAnimeList: {},
  ongoingAll: {},
  animeGenres: {},
  setAnimeGenres: () => {},
  setOngoingHome: () => {},
  setBatchHome: () => {},
  setTopAnimeList: () => {},
  setOngoingAll: () => {},
  batchAll: {},
  setBatchAll: () => {},
});

export const ContextProvider = ({ children }) => {
  // ANIME ONGOING
  const [ongoingHome, setOngoingHome] = useState([]);
  const [batchHome, setBatchHome] = useState([]);
  const [topAnimeList, setTopAnimeList] = useState([]);
  const [ongoingAll, setOngoingAll] = useState([]);
  const [batchAll, setBatchAll] = useState([]);
  const [animeGenres, setAnimeGenres] = useState([]);

  useEffect(() => {
    const fetchAnimesResponse = async () => {
      try {
        const response = await axiosClient.get(`/home`);
        const { anime, batch, top_anime_list } = response.data.data;
        setOngoingHome(anime);
        setTopAnimeList(top_anime_list);
        setBatchHome(batch);
        const animeGenresResponse = await axiosClient.get(`/genres`);
        setAnimeGenres(animeGenresResponse.data.data);
        const ongoingAllResponse = await axiosClient.get(`/ongoing-all`);
        setOngoingAll(ongoingAllResponse.data.data);
        const batchAllResponse = await axiosClient.get(`/batch-all`);
        setBatchAll(batchAllResponse.data.data);
        // const [ongoingAllResponse, batchAllResponse] = await Promise.all([axiosClient.get("/ongoing-all"), axiosClient.get("/batch-all")]);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchAnimesResponse();
  }, []);

  return (
    <StateContent.Provider
      value={{
        ongoingAll,
        topAnimeList,
        animeGenres,
        batchHome,
        ongoingHome,
        batchAll,
        setBatchAll,
        setAnimeGenres,
        setOngoingHome,
        setTopAnimeList,
        setBatchHome,
        setOngoingAll,
      }}>
      {children}
    </StateContent.Provider>
  );
};

export const useStateContext = () => useContext(StateContent);
