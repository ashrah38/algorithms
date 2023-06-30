class Node {
  constructor(Xval, Yval, id) {
    this.coords = [Xval, Yval];
    this.id = id;
    this.isWall = false;
  }
}

export default Node;
