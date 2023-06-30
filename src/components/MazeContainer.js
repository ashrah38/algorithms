import { React, useRef, useEffect, useState } from "react";
import Maze from "../dijkstra/Maze";

const MazeContainer = ({ mazeState, setMazeState, mazeObject, setMazeObject, forceRender }) => {
  const mazeRef = useRef(null);
  // retrieve the dimensions of the maze container after first render - only fired on the first render
  useEffect(() => {
    const { width, height } = mazeRef.current.getBoundingClientRect();
    const newMaze = new Maze(width, height); // this creates the Maze object on which all computations are done.
    // for the visuals, we don't need to store the maze object as the state.
    // instead, we will store state independently as an array of objects, where each object
    // represents one grid block, and contains the CSS classes associated with each grid block
    setMazeState(newMaze.mazeState);
    setMazeObject(newMaze);
  }, []);

  return (
    <div ref={mazeRef} className="maze-container">
      {mazeState.map((node) => (
        <div className={node.class} key={node.id}></div>
      ))}
    </div>
  );
};

export default MazeContainer;
