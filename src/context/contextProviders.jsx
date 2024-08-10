import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "@/axios";

// conextprovider
const StateContent = createContext({
  ongoingHome: {},
  batchHome: {},
  topAnimeList: {},
  ongoingAll: {},
  setOngoingHome: () => {},
  setBatchHome: () => {},
  setTopAnimeList: () => {},
  setOngoingAll: () => {},
});

export const ContextProvider = ({ children }) => {
  // ANIME ONGOING
  const [ongoingHome, setOngoingHome] = useState([]);
  const [batchHome, setBatchHome] = useState([]);
  const [topAnimeList, setTopAnimeList] = useState([]);
  const [ongoingAll, setOngoingAll] = useState([]);

  useEffect(() => {
    const fetchAnimesResponse = async () => {
      try {
        // const response = await axiosClient.get(`/home`);
        // setOngoingHome(response.data.data);

        const [ongoingHomeResponse, ongoingAllResponse] = await Promise.all([axiosClient.get("/home"), axiosClient.get("/ongoing-all")]);

        const { anime, batch, top_anime_list } = ongoingHomeResponse.data.data;
        setOngoingHome(anime);
        setTopAnimeList(top_anime_list);
        setBatchHome(batch);

        setOngoingAll(ongoingAllResponse.data.data);
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
        batchHome,
        ongoingHome,
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
