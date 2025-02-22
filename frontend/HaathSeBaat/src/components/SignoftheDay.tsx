import React from "react";

const SignOfTheDay: React.FC = () => {
  const videoId = "YQy_q0sAucuw"; 

  return (
    <div className="sign-of-the-day">
      <h2>Sign of the Day</h2>
      <div className="video-container">
        <iframe
          width="200"
          height="150"
          src="https://www.youtube.com/embed/ciKoJA7fuQc?si=fLcLguvCxFh01Be7"
          title="Sign of the Day"
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>
    </div>
  );
};

export default SignOfTheDay;
