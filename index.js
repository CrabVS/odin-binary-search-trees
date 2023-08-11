const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(this.sortArray(arr));
  }

  sortArray(arr) {
    return [...new Set(arr.sort((a, b) => { return a - b}))];
  }

  buildTree(arr) {
    if (arr.length === 0) return null;

    const midValue = Math.floor(arr.length / 2);
    const node = new Node(
      arr[midValue],
      this.buildTree(arr.slice(0, midValue)),
      this.buildTree(arr.slice(midValue + 1))
    );

    return node;
  }
}

const bigTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(bigTree.root);