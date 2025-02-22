import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = ({
  title = "Haath Se Baat",
  tagline = "Learn Indian Sign Language the fun way!",
  backgroundImage,
  links = [],
  aboutLinks = [],
  contactLinks = [],
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
        {/* Left Section - Haath Se Baat */}
        <div>
          <h2 className="text-2xl font-bold mb-3">{title}</h2>
          <p className="text-gray-400">{tagline}</p>
        </div>

        {/* Middle Section - Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            {aboutLinks.map((link, index) => (
              <li key={index}>
                <button
                  onClick={() =>
                    link.external
                      ? (window.location.href = link.url)
                      : handleNavigation(link.url)
                  }
                  className="text-gray-400 hover:text-white transition"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section - Connect With Us */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Connect With Us</h2>
          <ul className="space-y-2">
            {contactLinks.map((link, index) => (
              <li key={index}>
                <button
                  onClick={() =>
                    link.external
                      ? (window.location.href = link.url)
                      : handleNavigation(link.url)
                  }
                  className="text-gray-400 hover:text-white transition"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} {title}. All rights reserved.
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  backgroundImage:
    "https://images.unsplash.com/photo-1442291928580-fb5d0856a8f1?q=80&w=1932&auto=format&fit=crop",
};

Footer.propTypes = {
  title: PropTypes.string,
  tagline: PropTypes.string,
  backgroundImage: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.string,
      external: PropTypes.bool,
    })
  ),
  aboutLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      external: PropTypes.bool,
    })
  ),
  contactLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      external: PropTypes.bool,
    })
  ),
};

export default Footer;
