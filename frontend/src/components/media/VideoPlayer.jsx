import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
  return <ReactPlayer controls={true} url={url} width="300px" height="300px" />;
};

export default VideoPlayer;
