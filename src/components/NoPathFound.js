import React from "react";

const NoPathFound = ({ isPathFound }) => {
  let className = "no-path-popup hide";
  if (!isPathFound) {
    className = "no-path-popup";
  }
  return <div className={className}>No Path Found - try resetting the graph!</div>;
};

export default NoPathFound;
