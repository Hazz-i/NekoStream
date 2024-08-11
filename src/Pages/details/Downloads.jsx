import React from "react";

const Downloads = ({ downloads }) => {
  return (
    <div>
      <div className="text-start w-[55rem] font-bold text-lg">
        <h1>Link Downloads:</h1>
      </div>

      {/* MP 4 */}
      <span className="w-[55rem] bg-gray-900 rounded-lg grid gap-3 py-5">
        <h1 className="text-lg text-center py-2 px-5 bg-gray-950 rounded-sm mx-5">
          <span className="font-bold">Mp 4</span>
        </h1>

        <div className="flex items-center justify-around">
          <span className="text-center bg-gray-800 rounded-sm px-24 py-2">
            <h1>360p</h1>
          </span>
          <ul className="flex items-center justify-center gap-3">
            {downloads
              .filter((download) => download.type === "Mp4 360p" || download.type === "360p")
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
              .filter((download) => download.type === "Mp4 480p" || download.type === "480p")
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
              .filter((download) => download.type === "Mp4 720p" || download.type === "720p")
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

        {downloads.some((download) => download.type.toLowerCase().includes("mkv")) && (
          <div className="bg-gray-900 rounded-lg grid gap-3 py-5">
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
            {/* END MKV */}
          </div>
        )}
      </span>
    </div>
  );
};

export default Downloads;
