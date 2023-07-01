// the Maze class creates a grid based on the dimensions of the maze container (screen size)
import Node from "./Node";
const nodeLength = 18;

class Maze {
  constructor(width, height) {
    this.size = 0;
    this.nodes = new Map();
    this.visitedNodes = [];
    this.unvisitedNodes = [];
    this.mazeState = [];
    this.lastX = 0;
    this.lastY = 0;
    let id = 0;
    for (let i = 0; i < Math.floor(height / nodeLength); i++) {
      for (let j = 0; j < Math.floor(width / nodeLength); j++) {
        const newNode = new Node(i, j, id);
        this.nodes.set(`${i}_` + `${j}`, newNode);
        this.mazeState.push({ class: "maze-node", id: id, isWall: false });
        id += 1;
        this.size += 1;
        this.lastX = i;
        this.lastY = j;
      }
    }
    this.allotNeighbours();
    this.printNeighbours();
  }

  allotNeighbours() {
    // every node has at most 4 neighbours
    // a neighbour has an X value +1 and -1, and a Y-value +1 and -1
    for (let [key, value] of this.nodes) {
      let coords = key.split("_");
      // generate neighbour keys
      const neighbourLeft = parseInt(coords[0]) - 1; // -1
      const neighbourUp = parseInt(coords[1]) + 1; // +1
      const neighbourRight = parseInt(coords[0]) + 1; // +1
      const neighbourDown = parseInt(coords[1]) - 1; // -1
      if (neighbourLeft >= 0) value.neighbours.push(`${coords[0]}_${parseInt(coords[1]) - 1}`);
      if (neighbourUp <= this.lastY) value.neighbours.push(`${parseInt(coords[0]) + 1}_${coords[1]}`);
      if (neighbourRight <= this.lastX) value.neighbours.push(`${coords[0]}_${parseInt(coords[1]) + 1}`);
      if (neighbourDown >= 0) value.neighbours.push(`${parseInt(coords[0]) - 1}_${coords[1]}`);
    }
  }

  printNeighbours() {
    for (let [key, value] of this.nodes) {
      console.log(value.neighbours);
    }
  }

  // assigns the wall nodes randomly
  generateWalls() {
    let i = 0;
    for (let [key, value] of this.nodes) {
      let coords = key.split("_");
      // fill in the top bar
      if (coords[0] === "0") {
        this.mazeState[i].isWall = true;
        value.isWall = true;
      }
      if (coords[0] === this.lastX.toString()) {
        this.mazeState[i].isWall = true;
        value.isWall = true;
      }
      if (coords[1] === "0") {
        this.mazeState[i].isWall = true;
        value.isWall = true;
      }
      if (coords[1] === this.lastY.toString()) {
        this.mazeState[i].isWall = true;
        value.isWall = true;
      }
      // generate walls periodically
      if (Math.random() < 0.25) {
        this.mazeState[i].isWall = true;
        value.isWall = true;
      }

      i++;
    }
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
    const targetNodeS = this.nodes.get(`${startNodeCoords[0]}_${startNodeCoords[1]}`);
    targetNodeS.isStartNode = true;
    targetNodeS.isWall = false;
    this.mazeState[targetNodeS.id].isStartNode = true;
    this.mazeState[targetNodeS.id].isWall = false;
    const targetNodeE = this.nodes.get(`${endNodeCoords[0]}_${endNodeCoords[1]}`);
    targetNodeE.isEndNode = true;
    targetNodeE.isWall = false;
    this.mazeState[targetNodeE.id].isEndNode = true;
    this.mazeState[targetNodeE.id].isWall = false;
  }
}

export default Maze;
