class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left || null;
    this.right = right || null;
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

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    if (this.root === null) this.root = new Node(value);
    else this.insertLeaf(value, this.root);
  }

  insertLeaf(value, node) {
    if (value < node.data) {
      if (node.left === null) node.left = new Node(value);
      else this.insertLeaf(value, node.left);
    } 
    else if (value > node.data) {
      if (node.right === null) node.right = new Node(value);
      else this.insertLeaf(value, node.right);
    }
  }
}

const bigTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);


bigTree.insert(2);

bigTree.prettyPrint();