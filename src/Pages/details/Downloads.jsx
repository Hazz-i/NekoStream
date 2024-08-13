import React from "react";
import DownloadSection from "./DownloadSection";

const Downloads = ({ downloads }) => {
  return (
    <div className="grid gap-2 max-w-full lg:w-[55rem]">
      <div className="text-start font-semibold lg:font-bold text-lg">
        <h1 className="text-sm lg:text-lg">Link Downloads:</h1>
      </div>

      {/* MP4 */}
      <DownloadSection
        type="Mp4"
        resolutions={["360p", "480p", "720p"]}
        downloads={downloads}
      />

      {/* MKV */}
      <DownloadSection
        type="MKV"
        resolutions={["480p", "720p"]}
        downloads={downloads}
      />
    </div>
  );
};

export default Downloads;
