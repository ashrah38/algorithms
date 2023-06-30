// the Maze class creates a grid based on the dimensions of the maze container (screen size)
import Node from "./Node";
const nodeLength = 16.6;

class Maze {
  constructor(width, height) {
    this.size = 0;
    this.nodes = [];
    this.visitedNodes = [];
    this.unvisitedNodes = [];
    this.mazeState = [];
    let id = 0;
    for (let i = 0; i < Math.ceil(width / nodeLength); i++) {
      for (let j = 0; j < Math.ceil(height / nodeLength); j++) {
        const newNode = new Node(i, j, id);
        id += 1;
        this.size += 1;
        this.nodes.push(newNode);
        this.mazeState.push({ class: "maze-node", id: id, isWall: false });
      }
    }
  }

  // assigns the wall nodes randomly
  generateWalls() {
    for (let i = 0; i < this.size; i += 3) {
      this.nodes[i].isWall = true;
      this.mazeState[i].isWall = true;
    }
    return this;
  }

  // assigns the start and the end nodes
  assignNodes() {}
}

export default Maze;
