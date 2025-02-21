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
    <nav className="navbar navbar-expand-lg navbar-light bg-black ">
      <a className="navbar-brand" href="#">Navbar</a>
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
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
          <Link className="nav-link text-white" to="/">Home</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link text-white" to="/about">About Us</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Features</a>
          </li>
          <li className="nav-item dropdown">
            <a 
              className="nav-link dropdown-toggle text-white" 
              href="#" 
              id="navbarDropdownMenuLink" 
              role="button" 
              data-bs-toggle="dropdown" 
              aria-haspopup="true" 
              aria-expanded="false"
            >
              Dropdown link
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
