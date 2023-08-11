class Node {
    constructor(value) {
        this.value = value || null;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    buildTree(array) {
        console.log(array);
    }

    constructor(array) {
        this.root = this.buildTree(array);
    }

}

const bigTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);