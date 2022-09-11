const { mergeSort } = require('./MergeSort');

// 1
const Node = (input) => {
    return{
        data: input || null,
        leftData: null,
        rightData: null,
    }
}

// 2
const Tree = (array) => {
    
    // 3
    const cleanupArray = (array) => {
        // remove duplicates
        const arrayDup = array.filter((item, index) => {
            return array.indexOf(item) === index;
        });

        // merge sort array
        const arraySort = mergeSort(arrayDup);
        return arraySort;
    }

    const buildTree = (array) => {
        let arraySort = cleanupArray(array);

        // find the mid point of arraySort
        let start = 0;
        let end = arraySort.length - 1;
        let mid = Math.ceil((start + end) / 2);

        if(start > end) return null;
        let root = Node(arraySort[mid]);
        root.leftData = buildTree(arraySort.slice(start, mid));
        root.rightData = buildTree(arraySort.slice(mid + 1, end + 1));

        return root;
    }

    let root = null;
    if(array) root = buildTree(array);
    const getRoot = () => {
        return root;
    }

    // 4
    const insertItem = (value) => {
        let pointer = root;
        while(pointer.data){
            if(value > pointer.data){
                if(pointer.rightData == null){
                    pointer.rightData = Node(value);
                    return;
                }else{
                    pointer = pointer.rightData;
                }
            }else{
                if(pointer.leftData == null){
                    pointer.leftData = Node(value);
                    return;
                }else{
                    pointer = pointer.leftData;
                }
            }
        }
    }

    const deleteItem = (value) => {
        let pointer = root;
        let prevNode;
        while(pointer.data){
            if(value > pointer.data){
                prevNode = pointer;
                pointer = pointer.rightData;
            }else if(value < pointer.data){
                prevNode = pointer;
                pointer = pointer.leftData;
            }else{
                break;
            }
        }

        if(!pointer.leftData && !pointer.rightData){
            // node with no child
            if(prevNode.leftData && prevNode.leftData.data == pointer.data) prevNode.leftData = null;
            if(prevNode.rightData && prevNode.rightData.data == pointer.data) prevNode.rightData = null;
        }else if(pointer.leftData && pointer.rightData){
            // node with 2 child
            let pointerDelete = pointer;
            pointer = pointer.rightData;
            let tempPrevNode;
            let count = 0;
            while(pointer.leftData){
                tempPrevNode = pointer;
                pointer = pointer.leftData;
                count++;
            }

            if(prevNode.leftData == pointerDelete){
                prevNode.leftData.data = pointer.data;
                if(count !== 0){
                    tempPrevNode.leftData = null
                }else{
                    pointerDelete.rightData = pointer.rightData;
                }
                // remove pointer from it's prevNode
            }else{
                prevNode.rightData.data = pointer.data;
                if(count !== 0){
                    tempPrevNode.leftData = null
                }else{
                    pointerDelete.rightData = pointer.rightData;
                }
            }
            
            
        }else{
            // node with 1 child
            if(prevNode.leftData && prevNode.leftData.data == pointer.data){
                if(pointer.leftData)prevNode.leftData = pointer.leftData;
                if(pointer.rightData)prevNode.leftData = pointer.rightData;
            }
            if(prevNode.rightData && prevNode.rightData.data == pointer.data){
                if(pointer.leftData)prevNode.rightData = pointer.leftData;
                if(pointer.rightData)prevNode.rightData = pointer.rightData;
            } 
        }
    }

    // 5
    const find = (value) => {
        let pointer = root;
        while(pointer.data){
            if(value > pointer.data){
                pointer = pointer.rightData;    
            }else if(value < pointer.data){
                pointer = pointer.leftData;    
            }else{
                break;
            }
        }
        return pointer;
    }

    // 6: Recursive TBD
    const levelOrder = (f) => {
        if(root == null)return;

        let queue = [];
        queue.push(root);

        let arrayWithNoInput = [];

        // iteration
        while(queue.length){
            let pointer = queue[0];
            if(f) f(pointer.data);
            arrayWithNoInput.push(pointer.data);
            if(pointer.leftData) queue.push(pointer.leftData);
            if(pointer.rightData) queue.push(pointer.rightData);
            queue.shift();
        }

        if(!f) return arrayWithNoInput;
        
        // recursion
        // while(pointer.data){
        //     queue.push(pointer);
        //     queue.push(pointer.leftData);
        //     queue.push(pointer.rightData);
        // }
        // levelOrder(pointer.leftData);
        // levelOrder(pointer.rightData);

    }

    // 7
    const inorder = (f) => {
        // visit: Left / Root / Right
        let arrayWithNoInput = [];
        const traverse = (node) => {
            if(node == null) return
            traverse(node.leftData);
            if(f) f(node.data);
            arrayWithNoInput.push(node.data);
            traverse(node.rightData);
        }
        traverse(root);
        if(!f) return arrayWithNoInput;
    }

    const preorder = (f) => {
        // visit: Root / Left / Right
        let arrayWithNoInput = [];
        const traverse = (node) => {
            if(node == null) return
            if(f) f(node.data);
            arrayWithNoInput.push(node.data);
            traverse(node.leftData);
            traverse(node.rightData);
        }
        traverse(root);
        if(!f) return arrayWithNoInput;
    }

    const postorder = (f) => {
        // visit: Left / Right / Root
        let arrayWithNoInput = [];
        const traverse = (node) => {
            if(node == null) return
            traverse(node.leftData);
            traverse(node.rightData);
            if(f) f(node.data);
            arrayWithNoInput.push(node.data);
        }
        traverse(root);
        if(!f) return arrayWithNoInput;
    }

    // 8
    const height = (value) => {
        // find height of left subtree
        // find height of right subtree
        // return max(left, right) + 1;
        let node = find(value);

        const findHeight = (node) => {
            if(!node){
                return -1
            }else{
                return Math.max(findHeight(node.leftData), findHeight(node.rightData)) + 1;
            }
        }

        return findHeight(node);
    }

    // 9
    const depth = (value) => {
        let pointer = root;
        let count = 0;
        while(pointer.data){
            if(value > pointer.data){
                pointer = pointer.rightData; 
                count++;   
            }else if(value < pointer.data){
                pointer = pointer.leftData;
                count++;
            }else{
                break;
            }
        }
        return count;
    }

    // 10
    const isBalanced = () => {
        // determine the height of left and right subtree of root, diff < 2
        // console.log(height(root.leftData.data));
        // console.log(height(root.rightData.data));
        // console.log(Math.abs(height(root.leftData.data) - height(root.rightData.data)));
        if (Math.abs(height(root.leftData.data) - height(root.rightData.data)) < 2)
        {
            console.log(true);
        }else{
            console.log(false);
        }

    }

    // 11
    const rebalance = () => {
        let currentArray = cleanupArray(levelOrder());
        root = buildTree(currentArray);
    }


    return{
        getRoot,
        insertItem,
        deleteItem,
        find,
        levelOrder,
        inorder,
        preorder,
        postorder,
        height,
        depth,
        isBalanced,
        rebalance,
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.rightData !== null) {
      prettyPrint(node.rightData, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.leftData !== null) {
      prettyPrint(node.leftData, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}


// Driver Script
const array1 = Tree([1, 2, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
array1.isBalanced();
prettyPrint(array1.getRoot());
console.log('Level Order' + array1.levelOrder());
console.log('In Order' + array1.inorder());
console.log('Pre Order' + array1.preorder());
console.log('Post Order' + array1.postorder());

console.log('add numbers');
array1.insertItem(22);
array1.insertItem(24);
array1.insertItem(21);
array1.insertItem(2122);
array1.insertItem(2334);
array1.insertItem(2211);
array1.deleteItem(1);
array1.isBalanced();
prettyPrint(array1.getRoot());

array1.rebalance(array1.getRoot());
array1.isBalanced();
prettyPrint(array1.getRoot());
console.log('Level Order' + array1.levelOrder());
console.log('In Order' + array1.inorder());
console.log('Pre Order' + array1.preorder());
console.log('Post Order' + array1.postorder());