const SubDownload = ({ resolution, type, downloads }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between lg:justify-around gap-2 px-5">
      <span className="text-center bg-gray-800 rounded-sm w-full lg:w-1/4 py-2">
        <h1 className="text-sm">{resolution}</h1>
      </span>
      <ul className="flex items-center justify-center gap-1 lg:gap-3 flex-wrap">
        {downloads
          .filter((download) => download.type === `${type} ${resolution}` || download.type === `${resolution}`)
          .map((download, index) => (
            <li
              key={index}
              className="py-2 px-5 text-sm rounded-sm text-center border lg:hover:bg-gray-500 transition-all ease-in-out duration-300 hover:text-gray-950">
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
  );
};

export default SubDownload;
