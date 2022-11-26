import React from "react";

const Loader = () => {
  return (
    <span className="loader-container" data-testid="loaderContainer">
      <div className="loader" data-testid="loader" />
    </span>
  );
};

export { Loader };
