import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const Translator = () => {
  const socialLinks = [
    {
      label: "Instagram",
      url: "https://www.instagram.com/petofyindia/",
      icon: "https://example.com/instagram-icn.svg",
      external: true,
    },
    {
      label: "Twitter",
      url: "https://x.com/petofyindia",
      icon: "https://example.com/twitter-icon.svg",
      external: true,
    },
  ];

  const aboutLinks = [
    { label: "Our Mission", url: "/mission", external: false },
    { label: "Careers", url: "/careers", external: false },
    { label: "Privacy Policy", url: "/privacy", external: false },
  ];

  const contactLinks = [
    { label: "Contact Support", url: "/support", external: false },
    { label: "Email Us", url: "mailto:support@pawfect.com", external: true },
    { label: "Location", url: "/location", external: false },
  ];

  const navigate = useNavigate(); // Initialize useNavigate

  // Define the animation variants for Framer Motion
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  // Animation for the hover overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Animation for the button
  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.3 } },
  };

  // Dummy data for the cards with paths (only 4 cards)
  const cards = [
    {
      id: 1,
      image:
        "https://img.freepik.com/free-vector/deaf-mute-people-concept-illustration_114360-23206.jpg?t=st=1740204473~exp=1740208073~hmac=00af29d871074cc728b3dda08a1c1a299d3cde12ae5db2ab4df1c2b53376813a&w=900",
      title: "Dictionary",
      description: "A Machine Learning based communication software to understand what specially abled person is expressing using sign language",
      path: "/camera", // Path for this card
    },
    {
      id: 2,
      image:
        "https://img.freepik.com/free-vector/microphone-recording-authenticate-with-voice-receive-call-play-voip-send-audio-stable-unfluctuating-noise-transmitted-contact-isolated-concept-metaphor-illustration_335657-1192.jpg?t=st=1740209013~exp=1740212613~hmac=797a32a584d9f961e4dc4ec90c926ecb1ece8384556dcc578db32f2e9f323816&w=900",
      title: "Speech To Text",
      description: "A simple software to covert audio statements to text",
      path: "/stt", // Path for this card
    },
    {
      id: 3,
      image:
        "https://media.istockphoto.com/id/1186386668/vector/quiz-in-comic-pop-art-style-quiz-brainy-game-word-vector-illustration-design.jpg?s=612x612&w=0&k=20&c=mBQMqQ6kZuC9ZyuV5_uCm80QspqSJ7vRm0MfwL3KLZY=",
      title: "Sign Quiz",
      description: "A fun application for users willing to learn about sign language",
      path: "/Game1", // Path for this card
    },
    {
      id: 4,
      image: "https://png.pngtree.com/png-clipart/20220927/original/pngtree-sign-language-communication-for-the-deaf-and-the-disabled-png-image_8635918.png",
      title: "Random Sign Learner",
      description: "Get a chance to learn one new sign everyday",
      path: "/random", // Path for this card
    },
  ];

  return (
    <div>
      <Navbar></Navbar>
      <div className="container bg-warning">
        <div className="row">
          {/* First Row (2 columns) */}
          <div className="row mb-4">
            {cards.slice(0, 2).map((card) => (
              <div key={card.id} className="col-md-6"> {/* Changed to col-md-6 for 2 columns */}
                <motion.div
                  className="card"
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.8 }}
                  variants={cardVariants}
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  {/* Image */}
                  <img
                    src={card.image}
                    className="card-img-top"
                    alt={card.title}
                  />

                  {/* Overlay on hover */}
                  <motion.div
                    className="overlay"
                    initial="hidden"
                    whileHover="visible"
                    variants={overlayVariants}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {/* Title and Description */}
                    <motion.h5
                      className="card-title"
                      initial={{ y: -20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {card.title}
                    </motion.h5>
                    <motion.p
                      className="card-text"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {card.description}
                    </motion.p>

                    {/* Button */}
                    <motion.div variants={buttonVariants}>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(card.path)} // Use the path from JSON
                      >
                        Try Out
                      </button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Second Row (2 columns) */}
          <div className="row">
            {cards.slice(2, 4).map((card) => (
              <div key={card.id} className="col-md-6"> {/* Changed to col-md-6 for 2 columns */}
                <motion.div
                  className="card"
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.8 }}
                  variants={cardVariants}
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  {/* Image */}
                  <img
                    src={card.image}
                    className="card-img-top"
                    alt={card.title}
                  />

                  {/* Overlay on hover */}
                  <motion.div
                    className="overlay"
                    initial="hidden"
                    whileHover="visible"
                    variants={overlayVariants}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {/* Title and Description */}
                    <motion.h5
                      className="card-title"
                      initial={{ y: -20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {card.title}
                    </motion.h5>
                    <motion.p
                      className="card-text"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {card.description}
                    </motion.p>

                    {/* Button */}
                    <motion.div variants={buttonVariants}>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(card.path)} // Use the path from JSON
                      >
                        Try Out
                      </button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
      <Footer
        links={socialLinks}
        aboutLinks={aboutLinks}
        contactLinks={contactLinks}
        tagline="We are tagging you par kyu ??"
        title="HaathSeBaat"
      ></Footer>
    </div>
  );
};

export default Translator;