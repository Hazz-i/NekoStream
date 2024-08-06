import Header from "@/components/layout/Header";
import Bottom from "@/components/layout/Bottom";
import { Card } from "@/components/ui/card";

import { useState } from "react";

const Home = () => {
  const [ongoingAnimes, setOngoingAnimes] = useState([
    {
      title: "Na Nare Hana Nare",
      link: "https://otakudesu.cloud/anime/nare-hana-sub-indo/",
      episode: "Episode 5",
      image_url: "https://otakudesu.cloud/wp-content/uploads/2024/07/143526.jpg",
      image_alt: "Na Nare Hana Nare Sub Indo",
      date_release: "06 Agu",
      day_release: "Senin",
    },
    {
      title: "Kimi ni Todoke Season 3",
      link: "https://otakudesu.cloud/anime/kimi-todoke-s3-sub-indo/",
      episode: "Episode 5",
      image_url: "https://otakudesu.cloud/wp-content/uploads/2024/08/Kimi-ni-Todoke-s3.jpg",
      image_alt: "Kimi ni Todoke S3 Sub Indo",
      date_release: "06 Agu",
      day_release: "None",
    },
    {
      title: "VTuber Nandaga Haishin Kiri Wasuretara Densetsu ni Natteta",
      link: "https://otakudesu.cloud/anime/vtuber-nankiritara-sub-indo/",
      episode: "Episode 5",
      image_url: "https://otakudesu.cloud/wp-content/uploads/2024/07/VTuber-Nandaga-Haishin-Kiri-Wasuretara-Densetsu-ni-Natteta.jpg",
      image_alt: "VTuber Nandaga Haishin Kiri Wasuretara Densetsu ni Natteta Sub Indo",
      date_release: "05 Agu",
      day_release: "Senin",
    },
    {
      title: "Isekai Yururi Kikou",
      link: "https://otakudesu.cloud/anime/isekai-yuru-kikou-sub-indo/",
      episode: "Episode 6",
      image_url: "https://otakudesu.cloud/wp-content/uploads/2024/07/Isekai-Yururi-Kikou.jpg",
      image_alt: "Isekai Yururi Kikou Sub Indo",
      date_release: "05 Agu",
      day_release: "Senin",
    },
    {
      title: "Fairy Tail: 100-nen Quest",
      link: "https://otakudesu.cloud/anime/fairy-tail-100-quest-sub-indo/",
      episode: "Episode 5",
      image_url: "https://otakudesu.cloud/wp-content/uploads/2024/07/144083.jpg",
      image_alt: "Fairy Tail: 100-nen Quest Sub Indo",
      date_release: "04 Agu",
      day_release: "Minggu",
    },
    {
      title: "Yozakura-san Chi no Daisakusen",
      link: "https://otakudesu.cloud/anime/yozakura-daisakusen-sub-indo/",
      episode: "Episode 18",
      image_url: "https://otakudesu.cloud/wp-content/uploads/2024/04/Yozakura-san-Chi-no-Daisakusen.jpg",
      image_alt: "Yozakura-san Chi no Daisakusen Sub Indo",
      date_release: "04 Agu",
      day_release: "Minggu",
    },
    {
      title: "Tsue to Tsurugi no Wistoria",
      link: "https://otakudesu.cloud/anime/tsue-tsurugi-wistoria-sub-indo/",
      episode: "Episode 4",
      image_url: "https://otakudesu.cloud/wp-content/uploads/2024/07/142263.jpg",
      image_alt: "Tsue to Tsurugi no Wistoria Sub Indo",
      date_release: "04 Agu",
      day_release: "Minggu",
    },
    {
      title: "One Piece",
      link: "https://otakudesu.cloud/anime/opiece-sub-indo/",
      episode: "Episode 1114",
      image_url: "https://otakudesu.cloud/wp-content/uploads/2021/05/One-Piece-Sub-Indo.jpg",
      image_alt: "One Piece Sub Indo",
      date_release: "04 Agu",
      day_release: "Minggu",
    },
    {
      title: "Nige Jouzu no Wakagimi",
      link: "https://otakudesu.cloud/anime/nige-wakagimi-sub-indo/",
      episode: "Episode 5",
      image_url: "https://otakudesu.cloud/wp-content/uploads/2024/07/140401.jpg",
      image_alt: "Nige Jouzu no Wakagimi Sub Indo",
      date_release: "04 Agu",
      day_release: "Minggu",
    },
    {
      title: "Shoushimin Series",
      link: "https://otakudesu.cloud/anime/shoushimin-sub-indo/",
      episode: "Episode 4",
      image_url: "https://otakudesu.cloud/wp-content/uploads/2024/07/Shoushimin-Series.jpg",
      image_alt: "Shoushimin Series Sub Indo",
      date_release: "04 Agu",
      day_release: "Minggu",
    },
    {
      title: "The Fable",
      link: "https://otakudesu.cloud/anime/fable-sub-indo/",
      episode: "Episode 18",
      image_url: "https://otakudesu.cloud/wp-content/uploads/2024/04/The-Fable.jpg",
      image_alt: "The Fable Sub Indo",
      date_release: "04 Agu",
      day_release: "Minggu",
    },
    {
      title: "Atri: My Dear Moments",
      link: "https://otakudesu.cloud/anime/atri-my-dear-moments-sub-indo/",
      episode: "Episode 4",
      image_url: "https://otakudesu.cloud/wp-content/uploads/2024/07/Atri.jpg",
      image_alt: "Atri: My Dear Moments Sub Indo",
      date_release: "04 Agu",
      day_release: "None",
    },
    {
      title: "Naze Boku no Sekai wo Daremo Oboeteinai no ka?",
      link: "https://otakudesu.cloud/anime/naze-bokusekai-daremo-sub-indo/",
      episode: "Episode 4",
      image_url: "https://otakudesu.cloud/wp-content/uploads/2024/07/Naze-Boku-no-Sekai-wo-Daremo-Oboeteinai-no-ka.jpg",
      image_alt: "Naze Boku no Sekai wo Daremo Oboeteinai no ka? Sub Indo",
      date_release: "04 Agu",
      day_release: "Minggu",
    },
    {
      title: "Make Heroine ga Oosugiru!",
      link: "https://otakudesu.cloud/anime/heroine-oosugiru-sub-indo/",
      episode: "Episode 4",
      image_url: "https://otakudesu.cloud/wp-content/uploads/2024/07/Make-Heroine-ga-Oosugiru.jpg",
      image_alt: "Make Heroine ga Oosugiru! Sub Indo",
      date_release: "04 Agu",
      day_release: "Minggu",
    },
    {
      title: "Monogatari Series: Off & Monster Season",
      link: "https://otakudesu.cloud/anime/monogatari-monster-season-sub-indo/",
      episode: "Episode 5",
      image_url: "https://otakudesu.cloud/wp-content/uploads/2024/07/140952.jpg",
      image_alt: "Monogatari Series: Off & Monster Season Sub indo",
      date_release: "04 Agu",
      day_release: "Minggu",
    },
  ]);

  const [link, setLink] = useState("https://otakudesu.cloud/");
  const [veiwOngoing, setViewOngoing] = useState(true);

  const handleLink = (link) => {
    alert(link);
  };
  return (
    <>
      <Header />
      <div className="container min-h-[80vh] pt-20 flex flex-col">
        {/* ONGOING */}
        <span className="container bg-gray-900 rounded-lg pb-5">
          <h1 className="font-bold text-xl py-2">Anime Ongoing</h1>

          <div className="flex gap-5 flex-wrap justify-center items-center">
            {ongoingAnimes.map((anime, index) => (
              <span
                class="flex gap-4 max-w-[25rem]"
                key={index}>
                {/* CARD */}
                <button onClick={() => handleLink(anime.link)}>
                  <Card
                    className="w-[145px] h-[200px] hover:scale-105 transition-all transform duration-300 ease-in-out"
                    style={{
                      backgroundImage: `url(${anime.image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}></Card>
                </button>
                {/* END CARD */}

                {/* CONTENT RIGHT CARD */}
                <div className="text-wrap max-w-[250px]">
                  <h1 className="font-semibold">{anime.title}</h1>
                  <p className="text-xs my-2 ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis aliquam officiis veritatis enim architecto reprehenderit nostrum minus animi harum ducimus error, laudantium eos repudiandae,
                    laboriosam in iste cum tempore tempora.
                  </p>
                  <ul className="flex items-center justify-start gap-3 mt-5">
                    <li className="flex items-center justify-center">
                      <i class="bx bx-play"></i>
                      <small>{anime.episode}</small>
                    </li>
                    <li className="flex gap-1 items-center justify-center">
                      <i class="bx bxs-calendar"></i>
                      <small>
                        {anime.date_release} - {anime.day_release}
                      </small>
                    </li>
                  </ul>
                </div>
                {/*END CONTENT RIGHT CARD */}
              </span>
            ))}
          </div>
        </span>
        {/* END ONGOING */}

        {/* MOVIE */}
        <span className="container bg-gray-900 rounded-lg pb-5 my-5">
          <h1 className="font-bold text-xl py-2">Anime Movie</h1>

          <div className="flex gap-5 flex-wrap justify-center items-center">
            <h1 className="text-5xl font-bold">-- TODO --</h1>
          </div>
        </span>
        {/* END MOVIE */}
      </div>
    </>
  );
};

export default Home;
