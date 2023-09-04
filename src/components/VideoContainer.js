import React, { useEffect, useState } from "react";
import { YOUTUBE_VEDEOS_API } from "../utils/constant";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVedeos();
  }, []);

  const getVedeos = async () => {
    const data = await fetch(YOUTUBE_VEDEOS_API);
    const json = await data.json();
    setVideos(json?.items);
  };
  return (
    <div className="flex flex-wrap">
      {videos.map((item) => {
        return (
          <Link key={item.id} to={"/watch?v="+item.id}>
            <VideoCard  info={item} />;
          </Link>
        );
      })}
    </div>
  );
};

export default VideoContainer;
