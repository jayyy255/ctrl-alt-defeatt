import React from 'react';
import { motion } from 'framer-motion';
import CameraFeed from '../components/CameraFeed';
import { Link } from 'react-router-dom';

const Translator = () => {
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
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  // Dummy data for the cards
  const cards = [
    {
      id: 1,
      image: 'https://img.freepik.com/free-vector/deaf-mute-people-concept-illustration_114360-23206.jpg?t=st=1740204473~exp=1740208073~hmac=00af29d871074cc728b3dda08a1c1a299d3cde12ae5db2ab4df1c2b53376813a&w=900',
      title: 'Card 1',
      description: 'This is the description for card 1.',
      cta: 'Learn More',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      title: 'Card 2',
      description: 'This is the description for card 2.',
      cta: 'Learn More',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      title: 'Card 3',
      description: 'This is the description for card 3.',
      cta: 'Learn More',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/150',
      title: 'Card 4',
      description: 'This is the description for card 4.',
      cta: 'Learn More',
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/150',
      title: 'Card 5',
      description: 'This is the description for card 5.',
      cta: 'Learn More',
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/150',
      title: 'Card 6',
      description: 'This is the description for card 6.',
      cta: 'Learn More',
    },
  ];

  return (
    <div className="container my-5">
      <div className="row">
        {cards.map((card) => (
          <div key={card.id} className="col-md-4 mb-4">
            <motion.div
              className="card"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              variants={cardVariants}
            >
              <img src={card.image} className="card-img-top" alt={card.title} />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.description}</p>
                <Link to="#" className="btn btn-primary">
                  {card.cta}
                </Link>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Translator;