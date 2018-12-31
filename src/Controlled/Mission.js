import React from "react";

const Mission = props => {
  return (
    <div className="demo__section mission">
      <div className="container">
        <h2>
          <span>Mission</span>
        </h2>
        <button className="btn btn-secondary mission__button" {...props}>
          Advance
        </button>
      </div>
    </div>
  );
};

export default Mission;
