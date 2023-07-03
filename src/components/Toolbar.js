import React from "react";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";

const Toolbar = ({ onClickGenMaze, onClickResetMaze, onClickVisualize }) => {
  return (
    <div className="toolbar">
      <h1 className="title">Dijkstra's Algorithm</h1>
      <div className="btn-container">
        <Button onClick={() => onClickGenMaze()} variant="text" size="large" sx={{ color: "#fff", ":hover": { color: "#aaa" } }}>
          Generate Maze
        </Button>
        <Button
          onClick={() => onClickResetMaze()}
          variant="text"
          size="large"
          sx={{ color: "#fff", ":hover": { color: "#aaa" } }}
        >
          Reset Graph
        </Button>
        <Button
          onClick={() => onClickVisualize()}
          variant="text"
          size="large"
          sx={{ color: "#fff", ":hover": { color: "#aaa" } }}
        >
          Visualize
        </Button>
      </div>
      <div className="legend">
        <div className="legend-col">
          <div className="legend-item">
            <div className="legend-box start-node"></div>
            <p>Start Node</p>
          </div>
          <div className="legend-item">
            <div className="legend-box end-node"></div>
            <p>End Node</p>
          </div>
        </div>
        <div className="legend-col">
          <div className="legend-item ">
            <div className="legend-box visited-node"></div>
            <p>Visited Node</p>
          </div>
          <div className="legend-item ">
            <div className="legend-box walls"></div>
            <p>Walls</p>
          </div>
        </div>
      </div>
      <div className="instructions">
        <InfoIcon size="large" sx={{ color: "#fff", ":hover": { color: "#aaa", cursor: "pointer" } }}></InfoIcon>
      </div>
    </div>
  );
};

export default Toolbar;
