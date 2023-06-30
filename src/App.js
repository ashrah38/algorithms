import { React, useState } from "react";
import Toolbar from "./components/Toolbar";
import MazeContainer from "./components/MazeContainer";
import Maze from "./dijkstra/Maze";

const App = () => {
  const [mazeObject, setMazeObject] = useState(new Maze(0, 0));
  const [mazeState, setMazeState] = useState([]);
  const [forceRender, setForceRender] = useState(false);

  const generateMaze = () => {};

  return (
    <div className="primary-container">
      <Toolbar generateMaze={generateMaze} />
      <MazeContainer
        mazeState={mazeState}
        setMazeState={setMazeState}
        forceRender={forceRender}
        mazeObject={mazeObject}
        setMazeObject={setMazeObject}
      />
    </div>
  );
};

export default App;
