import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "@/axios";
import moment from "moment";

// conextprovider
const StateContent = createContext({
  animes: {},
  setAnimes: () => {},
});

export const ContextProvider = ({ children }) => {
  // DEPENDENCY
  const [animes, setAnimes] = useState({});

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await axiosClient.post(`/animes`);
        setAnimes(response.data.user);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
  }, [animes]);

  return (
    <StateContent.Provider
      value={{
        animes,
      }}>
      {children}
    </StateContent.Provider>
  );
};

export const useStateContext = () => useContext(StateContent);
