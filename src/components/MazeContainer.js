import { React, useRef, useEffect, useState } from "react";
import Maze from "../dijkstra/Maze";

const MazeContainer = ({ generateMaze }) => {
  const mazeRef = useRef(null);
  const [mazeObject, setMazeObject] = useState(new Maze(0, 0));
  const [mazeState, setMazeState] = useState([]);
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
      setTimeout(() => {
        const updatedState = [...mazeState];
        if (node.isWall) updatedState[node.id].class = "wall-node maze-node";
        setMazeState(updatedState);
      }, 10);
    });
  };

  return (
    <div ref={mazeRef} className="maze-container">
      {mazeState.map((node) => (
        <div
          onClick={() => {
            generateWalls();
          }}
          className={node.class}
          key={node.id}
        ></div>
      ))}
    </div>
  );
};

export default MazeContainer;
