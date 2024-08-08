import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "@/axios";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const Details = () => {
  const { title } = useParams();

  const [animeDetails, setAnimeDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setIsLoading(() => !isLoading);
        const response = await axiosClient.get(`/${title}/details`);
        setAnimeDetails(response.data.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(() => isLoading);
      }
    };

    fetchAnimeDetails();
  }, []);

  return (
    <>
      <div className="container min-h-[80vh] pt-20 pb-5 flex flex-col gap-5 items-center justify-center">
        {/* LOADING */}
        {isLoading && (
          <div class="relative">
            <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-400"></div>
            <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-700 animate-spin"></div>
          </div>
        )}
        {/* END LOADING */}

        {/* DETAILS */}
        {animeDetails?.map((anime, index) => (
          <span
            className="w-3/4 bg-gray-900 rounded-lg pb-5"
            key={index}>
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
          </span>
        ))}
        {/* END DETAILS */}
      </div>
    </>
  );
};

export default Details;
