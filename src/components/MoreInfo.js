import React from "react";

const MoreInfo = ({ isHovering }) => {
  let className = "more-info-popup hide";
  if (isHovering) {
    className = "more-info-popup";
  } else {
    className = "more-info-popup hide";
  }

  return (
    <div className={className}>
      <p>
        <span className="bold">Dijkstra's Algorithm</span> is a graph traversal algorithm used to find the shortest path from a
        starting node to all other nodes in a weighted graph. It works by maintaining a priority queue of nodes and continuously
        selecting the node with the smallest distance from the start. Initially, all nodes have an infinite distance, except for
        the start node which has a distance of 0. The algorithm iteratively visits the neighbors of the current node, updating
        their distances if a shorter path is found. This process continues until all nodes have been visited. Dijkstra's Algorithm
        guarantees the shortest path when all edge weights are non-negative.
      </p>
    </div>
  );
};

export default MoreInfo;
