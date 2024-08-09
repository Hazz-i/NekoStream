import { useEffect, useState } from "react";

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.github.com/repos/azharimm/nekostrem/releases")
      .then((res) => res.json())
      .then((data) => {
        setDownloads(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Downloads</h1>
    </div>
  );
};

export default Downloads;
