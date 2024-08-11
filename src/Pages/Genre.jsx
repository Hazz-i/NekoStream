import { useEffect, useState } from "react";
import { useStateContext } from "@/context/contextProviders";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

const Genre = () => {
  const { animeGenres } = useStateContext();

  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(animeGenres.length === 0 || animeGenres === undefined);

    setGenres(animeGenres);
  }, [animeGenres]);

  return (
    <div className="min-h-[95vh] container pt-20 pb-5 flex gap-5 items-center justify-center">
      {isLoading ? (
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-400"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-700 animate-spin"></div>
        </div>
      ) : (
        <>
          {/* GENRE*/}
          <span className="flex items-center justify-start flex-col gap-5 bg-gray-900 rounded-lg p-10">
            <h1 className="text-center font-semibold text-lg">Anime Genre List</h1>
            <div className="grid grid-cols-4 gap-3">
              {genres.map((genre, index) => {
                return (
                  <Button
                    onClick={() => navigate(`/neko-stream/genres/${genre.title}`)}
                    key={index}
                    className="px-5 py-2 text-center rounded-lg bg-gray-800 font-normal text-white hover:bg-gray-900 transition-all duration-300 ease-linear hover:text-gray-600">
                    <p className="text-sm">{genre.title}</p>
                  </Button>
                );
              })}
            </div>
          </span>
          {/* END GENRE*/}
        </>
      )}
    </div>
  );
};

export default Genre;
