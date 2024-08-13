import React from "react";
import SubDownload from "./SubDownload";

const DownloadSection = ({ type, resolutions, downloads }) => {
  return (
    downloads.some((download) => download.type.toLowerCase().includes(type.toLowerCase())) && (
      <div className="bg-gray-900 rounded-sm grid gap-3 py-5">
        <h1 className="text-sm font-semibold lg:text-lg text-center py-2 px-5 bg-gray-950 rounded-sm mx-5 lg:font-bold">{type}</h1>

        {resolutions.map((resolution, index) => (
          <SubDownload
            key={index}
            resolution={resolution}
            type={type}
            downloads={downloads}
          />
        ))}
      </div>
    )
  );
};

export default DownloadSection;
