import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/axios";

const SearchContext = createContext({
  searchResult: [],
  setSearchResult: () => {},
  isSearch: false,
  setIsSearch: () => {},
  search: {},
  setSearch: () => {},
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        setIsSearch(true);
        const response = await axiosClient.get(`/search=${search}`);
        setSearchResult(response.data.data);
      } catch (error) {
        console.log("Status Code:", error.response.status);
        setSearchResult([]);
        setIsSearch(false);
      } finally {
        setIsSearch(false);
        setSearch("");
      }
    };

    search.length > 0 && fetchSearch();
  }, [search]);

  return <SearchContext.Provider value={{ searchResult, setSearchResult, isSearch, setIsSearch, search, setSearch }}>{children}</SearchContext.Provider>;
};
