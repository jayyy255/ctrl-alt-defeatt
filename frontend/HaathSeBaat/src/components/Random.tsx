import React, { useState } from "react";

const videoList = [
  "/signs/hello.mp4",
  "/signs/thankyou.mp4",
  "/signs/goodbye.mp4",
  "/signs/please.mp4",
  "/signs/love.mp4",
];

const RandomSign: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState(videoList[0]);

  const playRandomVideo = () => {
    const randomIndex = Math.floor(Math.random() * videoList.length);
    setVideoSrc(videoList[randomIndex]);
  };

  return (
    <div className="text-center p-6 bg-[#ffc400] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#6b46c1] mb-4">Learn a Random Sign</h2>

      <div className="border-4 border-[#6b46c1] p-2 rounded-lg inline-block">
        <video width="300" height="200" controls key={videoSrc} className="rounded-lg">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <button
        className="mt-4 px-6 py-3 text-white rounded-lg shadow-md transition-all duration-300"
        style={{
          backgroundColor: "#198754",
          border: "2px solid #e74c3c",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e74c3c")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#198754")}
        onClick={playRandomVideo}
      >
        Get a Random Sign
      </button>
    </div>
  );
};

export default RandomSign;
