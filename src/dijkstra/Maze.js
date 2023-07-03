/* eslint-disable no-loop-func */
// the Maze class creates a grid based on the dimensions of the maze container (screen size)
import Node from "./Node";
const nodeLength = 18;

class Maze {
  constructor(width, height) {
    this.size = 0;
    this.nodes = new Map();
    this.startNode = null;
    this.endNode = null;
    this.visitedNodes = new Map();
    this.queuedNodes = new Map();
    this.shortestPath = [];
    this.visitQueue = [];
    this.mazeState = [];
    this.lastX = 0;
    this.lastY = 0;
    this.numWalls = 0;
    let id = 0;
    for (let i = 0; i < Math.floor(height / nodeLength); i++) {
      for (let j = 0; j < Math.floor(width / nodeLength); j++) {
        const newNode = new Node(i, j, id);
        this.nodes.set(`${i}_${j}`, newNode);
        this.mazeState.push({ class: "maze-node", id: id, isWall: false });
        id += 1;
        this.size += 1;
        this.lastX = i;
        this.lastY = j;
      }
    }
  }

  resetGraph(width, height) {
    return new Maze(width, height);
  }

  allotNeighbours() {
    // every node has at most 4 neighbours
    // a neighbour has an X value +1 and -1, and a Y-value +1 and -1
    for (let [key, value] of this.nodes) {
      let coords = key.split("_");
      // generate neighbour keys
      const neighbourLeft = parseInt(coords[1]) - 1;
      const neighbourRight = parseInt(coords[1]) + 1;
      const neighbourUp = parseInt(coords[0]) - 1;
      const neighbourDown = parseInt(coords[0]) + 1;
      const coordsL = `${coords[0]}_${neighbourLeft}`; // left neighbour coords
      const coordsR = `${coords[0]}_${neighbourRight}`; // right neighbour coords
      const coordsU = `${neighbourUp}_${coords[1]}`; // up neighbour coords
      const coordsD = `${neighbourDown}_${coords[1]}`; // down neibhour coords
      if (neighbourLeft >= 0 && !this.nodes.get(coordsL).isWall) value.neighbours.push(coordsL);
      if (neighbourRight <= this.lastY && !this.nodes.get(coordsR).isWall) value.neighbours.push(coordsR);
      if (neighbourUp >= 0 && !this.nodes.get(coordsU).isWall) value.neighbours.push(coordsU);
      if (neighbourDown <= this.lastX && !this.nodes.get(coordsD).isWall) value.neighbours.push(coordsD);
    }
  }

  printNeighbours() {
    for (let [key, value] of this.nodes) {
      console.log(key, value.neighbours);
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
        this.numWalls++;
      }
      if (coords[0] === this.lastX.toString()) {
        this.mazeState[i].isWall = true;
        value.isWall = true;
        this.numWalls++;
      }
      if (coords[1] === "0") {
        this.mazeState[i].isWall = true;
        value.isWall = true;
        this.numWalls++;
      }
      if (coords[1] === this.lastY.toString()) {
        this.mazeState[i].isWall = true;
        value.isWall = true;
        this.numWalls++;
      }
      // generate walls periodically
      if (Math.random() < 0.25) {
        this.mazeState[i].isWall = true;
        value.isWall = true;
        this.numWalls++;
      }

      i++;
    }
    this.assignNodes();
    this.allotNeighbours();
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
    this.startNode = targetNodeS;
    targetNodeS.isStartNode = true;
    targetNodeS.isWall = false;
    this.mazeState[targetNodeS.id].isStartNode = true;
    this.mazeState[targetNodeS.id].isWall = false;
    const targetNodeE = this.nodes.get(`${endNodeCoords[0]}_${endNodeCoords[1]}`);
    this.endNode = targetNodeE;
    targetNodeE.isEndNode = true;
    targetNodeE.isWall = false;
    this.mazeState[targetNodeE.id].isEndNode = true;
    this.mazeState[targetNodeE.id].isWall = false;
  }

  djikstra() {
    const startNode = this.startNode;
    let currentNode = startNode;
    currentNode.distance = 0;
    let endLoop = false;
    this.visitQueue.push(currentNode);
    this.queuedNodes.set(currentNode.id, currentNode);
    while (this.visitQueue.length) {
      this.visitedNodes.set(currentNode.id, currentNode);
      // iterate over the neigbours
      currentNode.neighbours.forEach((nodeAddress) => {
        const node = this.nodes.get(nodeAddress);
        // end the loop if the end node is reached
        if (node.isEndNode) endLoop = true;
        // update the shortest distance to start node, and the previous node value
        if (currentNode.distance + 1 < node.distance) {
          node.distance = currentNode.distance + 1;
          node.previousNode = currentNode; // previous node can only be updated by a neighbour
        }
        node.distance = currentNode.distance + 1;
        if (!this.visitedNodes.get(node.id) && !this.queuedNodes.get(node.id)) this.visitQueue.push(node);
        this.queuedNodes.set(node.id, node);
      });
      currentNode = this.visitQueue.shift();
      if (endLoop) break;
    }
  }

  visualizeSearch() {
    this.djikstra();
  }

  findShortestPath() {
    let currentNode = this.endNode;
    let previousNode = currentNode.previousNode;
    console.log(this.startNode);
    console.log(this.endNode);
    console.log(this.queuedNodes);
    while (previousNode != null) {
      this.shortestPath.push(previousNode);
      previousNode = previousNode.previousNode;
    }
    this.shortestPath.reverse();
  }
}

export default Maze;
