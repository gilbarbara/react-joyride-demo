import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="demo__footer">
      <button>
        <span />
      </button>
      <div className="demo__menu">
        <Link to="/">Basic</Link>
        <Link to="/controlled">Controlled</Link>
        <Link to="/custom">Custom</Link>
        <Link to="/carousel">Carousel</Link>
        <Link to="/modal">Modal</Link>
        <Link to="/scroll">Scroll</Link>
      </div>
    </footer>
  );
};

export default Footer;
