import React from "react";

const Hero = props => {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero__content">
          <h1>
            <span>
              Create walkthroughs and guided tours for your ReactJS apps.
            </span>
          </h1>
          <button className="hero__start" {...props}>
            Let's Go!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
