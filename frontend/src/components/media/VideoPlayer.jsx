import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
  return <ReactPlayer controls={true} url={url} width="100%" height="100%" />;
};

export default VideoPlayer;
