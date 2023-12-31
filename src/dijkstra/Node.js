class Node {
  constructor(Xval, Yval, id) {
    this.coords = [Xval, Yval];
    this.id = id;
    this.isWall = false;
    this.isStartNode = false;
    this.isEndNode = false;
    this.previousNode = null;
    this.neighbours = [];
    this.distance = Infinity;
  }
}

export default Node;
