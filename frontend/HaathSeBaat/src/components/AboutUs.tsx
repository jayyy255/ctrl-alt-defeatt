import React from "react";
import Navbar from "./Navbar";
import './aboutus.css';
const image1 = "/about_1.png"; 
const image2 = "/about_2.png";
const image3 = "/about_4.png";
const image4 = "/about_3.png";


const AboutUs = () => {
  const aboutUsData = [
    {
      id: 1,
      title: "Who are we?",
      description:
        "Haath Se Baat is an innovative platform that translates Indian Sign Language (ISL) gestures into text and speech, enabling seamless interaction and learning.",
      circleClass: "circle-1",
      image: image1,
    },
    {
      id: 2,
      title: "Our Mission",
      description:
        "To bridge the gap between the hearing and speech-impaired community and the wider world through the power of AI-driven sign language recognition.",
        circleClass: "circle-2",
      image: image2,
    },
    {
      id: 3,
      title: "Our Vision",
      description:
        "We committed to creating a world where everyone can communicate freely, regardless of their ability to hear or speak",
      circleClass: "circle-3",
      image: image3,
    },
    {
      id: 4,
      title: "What we offer",
      description:
        "Our AI-powered tool is designed to: Recognize and interpret basic ISL gestures into structured text and speech. Offer interactive lessons and quizzes for sign language learners. Provide speech-to-text functionality for a two-way communication experience. Include gesture animation playback to guide users in forming correct signs. Allow users to contribute custom signs, expanding a growing database for better accessibility.",
      circleClass: "circle-4",
      image: image4,
    },
  ];

  return (
    <div
      id="about"
      className="min-h-screen bg-gradient-to-br from-[#ff9a9e] to-[#fad0c4] flex flex-col aboutus"
    >
      <Navbar />

      <div className="startup">
        {aboutUsData.map((section) => (
          <div key={section.id} className={section.circleClass}>
            <h1>
              <strong>{section.title}</strong>
            </h1>
            <p>{section.description}</p>
            <div className="container">
              <div className="card">
                <div
                  className={section.circleClass}
                  style={{ backgroundImage: `url(${section.image})` }}
                >
                  <div className="content"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
