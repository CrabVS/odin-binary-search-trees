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

  delete(value) {
    if (value === this.root.data) {
      const rightChild = this.root.right;
      let leftestParent = rightChild;
      let leftestChild = leftestParent.left;

      while (leftestChild.left !== null) {
        leftestParent = leftestChild;
        leftestChild = leftestParent.left;
      }

      leftestParent.left = leftestChild.right;
      leftestChild.left = this.root.left;
      leftestChild.right = this.root.right;

      this.root = leftestChild;
    } 
    else {
      const dir = value < this.root.data ? 'left' : 'right';

      this.deleteLeaf(value, this.root, dir, this.root[dir]);
    }
  }

  deleteLeaf(value, parent, parentDir, child) {
    if (child === null) return null;
    if (value === child.data || value === this.root.data) { // If the node matches the value
      if (child.left === null && child.right == null) { // If no children
        parent[parentDir] = null;
        return;
      }

      if (child.left === null) { // If one child
        const dir = child.left === null ? 'right' : 'left';
        parent[parentDir] = child[dir];
        return;
      }

      else { // two children
        const rightChild = child.right;
        let leftestParent = rightChild;
        let leftestChild = leftestParent.left;

        while (leftestChild.left !== null) {
          leftestParent = leftestChild;
          leftestChild = leftestParent.left;
        }

        parent[parentDir] = leftestChild;
        leftestParent.left = leftestChild.right;
        leftestChild.left = child.left;
        leftestChild.right = child.right;
      }
    }
    else { // Else recurse until found
      const dir = value < child.data ? 'left' : 'right';
      this.deleteLeaf(value, child, dir, child[dir]);
    }
  }

  find(value, node = this.root) {
    if (value === node.data) {
      return node;
    }
    if (node.left === null && node.right === null) return null;

    const dir = value < node.data ? 'left' : 'right';

    return this.find(value, node[dir]);
  }

  levelOrder(callback) {
    let queue = [this.root];
    let values = [];

    while (queue.length !== 0) {
      if (callback) callback(queue[0]);
      if (queue[0].left !== null) queue.push(queue[0].left);
      if (queue[0].right !== null) queue.push(queue[0].right);

      values.push(queue[0].data);

      queue.shift();
    }

    if (!callback) return values;
  }

  inorder(callback = null, node = this.root, values = []) {
    if (node === null) return;

    this.inorder(callback, node.left, values);
    callback !== null ? callback(node) : values.push(node.data);
    this.inorder(callback, node.right, values);

    if (callback === null) return values;
  }

  preorder(callback = null, node = this.root, values = []) {
    if (node === null) return;

    callback !== null ? callback(node) : values.push(node.data);
    this.preorder(callback, node.left, values);
    this.preorder(callback, node.right, values);

    if (callback === null) return values;
  }

  postorder(callback = null, node = this.root, values = []) {
    if (node === null) return;

    this.postorder(callback, node.left, values);
    this.postorder(callback, node.right, values);
    callback !== null ? callback(node) : values.push(node.data);

    if (callback === null) return values;
  }
}

const bigTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);


bigTree.insert(2);

bigTree.prettyPrint();

console.log('-----------');

bigTree.delete(4);

bigTree.prettyPrint();

console.log(bigTree.inorder());
console.log(bigTree.preorder());
console.log(bigTree.postorder());