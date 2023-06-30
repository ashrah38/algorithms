import { React, useState } from "react";
import Toolbar from "./components/Toolbar";
import MazeContainer from "./components/MazeContainer";
import Maze from "./dijkstra/Maze";

const App = () => {
  const [generateMaze, setGenerateMaze] = useState(false);

  // fired on clicking the 'Generate Maze' Button
  const generateMazeHandler = () => {
    setGenerateMaze(!generateMaze);
  };

  return (
    <div className="primary-container">
      <Toolbar generateMaze={generateMazeHandler} />
      <MazeContainer generateMaze={generateMaze} />
    </div>
  );
};

export default App;
