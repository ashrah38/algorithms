import { React, useRef, useEffect, useState } from "react";
import Maze from "../dijkstra/Maze";
import Toolbar from "./Toolbar";

const MazeContainer = ({}) => {
  const mazeRef = useRef(null); // reference to the maze container
  const [mazeDimensions, setMazeDimensions] = useState([]); // stores the maze dimensions
  const [mazeObject, setMazeObject] = useState(new Maze(0, 0)); // tracks the maze object
  const [mazeState, setMazeState] = useState([]); // tracks the maze state

  // retrieve the dimensions of the maze container after first render - only fired on the first render
  useEffect(() => {
    const { width, height } = mazeRef.current.getBoundingClientRect();
    setMazeDimensions([width, height]);
    const newMaze = new Maze(width, height); // this creates the Maze object on which all computations are done.
    setMazeObject(newMaze);
    setMazeState(newMaze.mazeState);
  }, []);

  // button handler for the generate maze button
  const onClickGenMaze = () => {
    generateWalls();
  };

  // button handler for the reset maze button
  const onClickResetMaze = () => {
    const newMaze = new Maze(mazeDimensions[0], mazeDimensions[1]);
    setMazeObject(newMaze);
    setMazeState(newMaze.mazeState);
  };

  const onClickVisualize = () => {
    visualizeSearch();
    visualizePath();
  };

  // generates the walls on the maze - unanimated
  const generateWalls = () => {
    setMazeObject(mazeObject.generateWalls());
    // update CSS states based on node type
    mazeObject.mazeState.forEach((node) => {
      const updatedState = [...mazeState];
      if (node.isWall) updatedState[node.id].class = "maze-node wall-node";
      if (node.isStartNode) updatedState[node.id].class = "maze-node start-node";
      if (node.isEndNode) updatedState[node.id].class = "maze-node end-node";

      setMazeState(updatedState);
    });
  };

  // initializes the animation for the dijkstra's
  const visualizeSearch = () => {
    console.log(mazeObject);
    setMazeObject(mazeObject.visualizeSearch());
    mazeObject.queuedNodes.forEach((node) => {
      setTimeout(() => {
        if (!node.isStartNode && !node.isEndNode) {
          const updatedState = [...mazeState];
          updatedState[node.id].class = "visited-node";
          setMazeState(updatedState);
        }
      }, 20);
    });
  };

  const visualizePath = () => {
    if (!mazeObject.wallsGenerated) return;
    setMazeObject(mazeObject.findShortestPath());
    mazeObject.shortestPath.forEach((node) => {
      setTimeout(() => {
        if (!node.isStartNode && !node.isEndNode) {
          const updatedState = [...mazeState];
          updatedState[node.id].class = "path-node";
          setMazeState(updatedState);
        }
      }, 3000);
    });
  };

  return (
    <>
      <Toolbar onClickGenMaze={onClickGenMaze} onClickResetMaze={onClickResetMaze} onClickVisualize={onClickVisualize} />
      <div ref={mazeRef} className="maze-container">
        {mazeState.map((node) => (
          <div className={node.class} key={node.id}></div>
        ))}
      </div>
    </>
  );
};

export default MazeContainer;
