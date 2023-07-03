import { React, useRef, useEffect, useState } from "react";
import Maze from "../dijkstra/Maze";

const MazeContainer = ({ generateMaze }) => {
  const mazeRef = useRef(null); // reference to the maze container
  const [mazeObject, setMazeObject] = useState(new Maze(0, 0)); // tracks the maze object
  const [mazeState, setMazeState] = useState([]); // tracks the maze state
  // retrieve the dimensions of the maze container after first render - only fired on the first render
  useEffect(() => {
    const { width, height } = mazeRef.current.getBoundingClientRect();
    const newMaze = new Maze(width, height); // this creates the Maze object on which all computations are done.
    setMazeObject(newMaze);
    setMazeState(newMaze.mazeState);
  }, []);

  const generateWalls = () => {
    setMazeObject(mazeObject.generateWalls());

    mazeObject.mazeState.forEach((node) => {
      const updatedState = [...mazeState];
      if (node.isWall) updatedState[node.id].class = "maze-node wall-node";
      if (node.isStartNode) updatedState[node.id].class = "maze-node start-node";
      if (node.isEndNode) updatedState[node.id].class = "maze-node end-node";

      setMazeState(updatedState);
    });
  };

  const visualizeSearch = () => {
    setMazeObject(mazeObject.visualizeSearch());

    mazeObject.queuedNodes.forEach((node) => {
      setTimeout(() => {
        if (!node.isStartNode && !node.isEndNode) {
          const updatedState = [...mazeState];
          updatedState[node.id].class = "maze-node visited-node";
          setMazeState(updatedState);
        }
      }, 20);
    });
  };

  const visualizePath = () => {
    setMazeObject(mazeObject.findShortestPath());
    mazeObject.shortestPath.forEach((node) => {
      setTimeout(() => {
        if (!node.isStartNode && !node.isEndNode) {
          const updatedState = [...mazeState];
          updatedState[node.id].class = "maze-node path-node";
          setMazeState(updatedState);
        }
      }, 3000);
    });
  };

  return (
    <div ref={mazeRef} className="maze-container">
      {mazeState.map((node) => (
        <div
          onClick={() => {
            generateWalls();
            visualizeSearch();
            visualizePath();
          }}
          className={node.class}
          key={node.id}
        ></div>
      ))}
    </div>
  );
};

export default MazeContainer;
