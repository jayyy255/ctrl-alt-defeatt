import React from "react";
import { useNavigate, Link } from "react-router-dom";

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19c0-2.21 1.79-4 4-4h2c2.21 0 4 1.79 4 4v1.662" />
  </svg>
);

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-black py-1 fs-5  shadow-sm">
      <div className="container">
        <a className="navbar-brand text-white fs-" href="#">Navbar</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNavDropdown" 
          aria-controls="navbarNavDropdown" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {["Home", "About Us", "Features"].map((tab, index) => (
              <li key={index} className="nav-item mx-2">
                <Link className="nav-link text-white custom-hover" to={`/${tab.replace(/\s+/g, '').toLowerCase()}`}>
                  {tab}
                </Link>
              </li>
            ))}
            <li className="nav-item dropdown mx-2">
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
            </li>
          </ul>
        </div>
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
      `}</style>
    </nav>
  );
};

export default Navbar;
