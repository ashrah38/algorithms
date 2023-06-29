import React from "react";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <h1 className="title">Dijkstra's Algorithm</h1>
      <div className="btn-container">
        <Button variant="text" size="large" sx={{ color: "#fff" }}>
          Generate Maze
        </Button>
        <Button variant="text" size="large" sx={{ color: "#fff" }}>
          Reset Graph
        </Button>
        <Button variant="text" size="large" sx={{ color: "#fff" }}>
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
        <InfoIcon size="large" sx={{ color: "#fff" }}></InfoIcon>
      </div>
    </div>
  );
};

export default Toolbar;
