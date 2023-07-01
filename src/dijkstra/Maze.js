// the Maze class creates a grid based on the dimensions of the maze container (screen size)
import Node from "./Node";
const nodeLength = 18;

class Maze {
  constructor(width, height) {
    this.size = 0;
    this.nodes = [];
    this.visitedNodes = [];
    this.unvisitedNodes = [];
    this.mazeState = [];
    this.lastX = 0;
    this.lastY = 0;
    let id = 0;
    for (let i = 0; i < Math.floor(height / nodeLength); i++) {
      for (let j = 0; j < Math.floor(width / nodeLength); j++) {
        const newNode = new Node(i, j, id);
        this.nodes.push(newNode);
        this.mazeState.push({ class: "maze-node", id: id, isWall: false });
        id += 1;
        this.size += 1;
        this.lastX = i;
        this.lastY = j;
      }
    }
  }

  // assigns the wall nodes randomly
  generateWalls() {
    // fill all the sides, and 40% of the inner boxes
    this.nodes.forEach((node, index) => {
      // generate the borders
      if (node.coords[0] === 0) this.mazeState[index].isWall = true;
      if (node.coords[0] === this.lastX) this.mazeState[index].isWall = true;
      if (node.coords[1] === 0) this.mazeState[index].isWall = true;
      if (node.coords[1] === this.lastY) this.mazeState[index].isWall = true;
      // generate walls periodically for all other boxes
      if (Math.random() < 0.25) this.mazeState[index].isWall = true;
    });
    this.assignNodes();
    return this;
  }

  // assigns the start and the end nodes
  assignNodes() {
    // ideally, we want the start node to be in the left middle, and the
    // end node to be in the right middle. We can play around with the coordinates
    // to achieve this.
    let startNodeCoords = [Math.floor(this.lastX / 2 + 3 * Math.random()), Math.floor(this.lastY / 4 + 5 * Math.random())];
    let endNodeCoords = [Math.floor(this.lastX / 2 + 3 * Math.random()), Math.floor(this.lastY / (4 / 3) + 5 * Math.random())];
    // we want to randomize this some what.
    let i = 0;
    while (JSON.stringify(this.nodes[i].coords) !== JSON.stringify(startNodeCoords)) {
      i += 1;
    }
    this.mazeState[i].isStartNode = true;
    this.mazeState[i].isWall = false;
    i = 0;
    while (JSON.stringify(this.nodes[i].coords) !== JSON.stringify(endNodeCoords)) {
      i += 1;
    }
    this.mazeState[i].isEndNode = true;
    this.mazeState[i].isWall = false;
  }
}

export default Maze;
