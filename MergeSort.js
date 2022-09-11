// merge 2 sorted arrays
const merge = (array1, array2) => {
    let sortedArray=[];
    let n = array1.length + array2.length;
    for(let i = 0; i < n; i++){
        if(array1[0] > array2[0]){
            sortedArray.push(array2[0]);
            array2.shift();
        }else if(array2[0] > array1[0]){
            sortedArray.push(array1[0]);
            array1.shift();
        }else{
            typeof array1[0] === 'undefined' ? 
                sortedArray.push(...array2)
                : sortedArray.push(...array1);
        }
        if(sortedArray.length == n) break;
    }
    return sortedArray;
}

const mergeSort = (array) => {

    if (array.length > 1){

        // split array in half, until it's 1-1
        let n = Math.floor(array.length / 2);
        const leftArray = array.slice(0,n);
        const rightArray = array.slice(n);

        return merge(mergeSort(leftArray), mergeSort(rightArray));

    }else{
        // while array.length = 1
        return array;
    }

}

module.exports ={ mergeSort };