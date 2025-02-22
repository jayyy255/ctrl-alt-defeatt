import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Navigation paths
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Features", path: "/features" }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-black py-1 fs-5 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand text-white fs-4" href="#">Navbar</a>

        <button className="navbar-toggler text-white" type="button" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <motion.div
          className={`collapse navbar-collapse ${isOpen ? 'd-block' : 'd-none'} d-lg-flex justify-content-center`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="navbar-nav">
            {navItems.map((tab, index) => (
              <motion.li
                key={index}
                className="nav-item mx-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <button 
                  className="btn text-white custom-hover"
                  onClick={() => navigate(tab.path)}
                >
                  {tab.name}
                </button>
              </motion.li>
            ))}

            <li className="nav-item dropdown mx-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  className="nav-link dropdown-toggle text-white custom-hover"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  {["Action", "Another action", "Something else here"].map((item, index) => (
                    <a key={index} className="dropdown-item" href="#">{item}</a>
                  ))}
                </div>
              </motion.div>
            </li>
          </ul>
        </motion.div>
      </div>

      <style jsx>{`
        .custom-hover {
          transition: all 0.3s ease;
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }
        .custom-hover:hover {
          background-color: white;
          color: black !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
        }
        .navbar {
          min-height: 80px;
        }
        @media (max-width: 992px) {
          .navbar-collapse {
            background-color: black;
            padding: 1rem;
            border-radius: 10px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
