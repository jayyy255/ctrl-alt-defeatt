import React from "react";

const SignOfTheDay: React.FC = () => {
  const videoId = "YQy_q0sAucuw"; 

  return (
    <div className="sign-of-the-day">
      <h2>Sign of the Day</h2>
      <div className="video-container">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/Qy_q0sAucuw?si=ztvuDVzKAL_uyQeO"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default SignOfTheDay;
