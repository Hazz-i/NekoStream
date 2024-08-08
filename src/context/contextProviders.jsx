import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "@/axios";

// conextprovider
const StateContent = createContext({
  ongoingHome: {},
  ongoingAll: {},
  setOngoingHome: () => {},
  setOngoingAll: () => {},
});

export const ContextProvider = ({ children }) => {
  // ANIME ONGOING
  const [ongoingHome, setOngoingHome] = useState([]);
  const [ongoingAll, setOngoingAll] = useState([]);

  useEffect(() => {
    const fetchAnimesResponse = async () => {
      try {
        const response = await axiosClient.get(`/home`);
        setOngoingHome(response.data.data);

        const [ongoingHomeResponse, ongoingAllResponse] = await Promise.all([axiosClient.get("/home"), axiosClient.get("/ongoing-all")]);

        setOngoingHome(ongoingHomeResponse.data.data);
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
        ongoingHome,
        setOngoingHome,
        setOngoingAll,
      }}>
      {children}
    </StateContent.Provider>
  );
};

export const useStateContext = () => useContext(StateContent);
