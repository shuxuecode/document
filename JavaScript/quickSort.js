function quickSort(arr, low, high) {
    if (low < high) {
        var index = getIndex(arr, low, high)
        console.log('index = ' + index)
        quickSort(arr, low, index - 1)
        quickSort(arr, index + 1, high)
    }
}

function getIndex(arr, low, high) {
    var tmp = arr[low]
    if (low < high) {
        while (low < high && arr[high] > tmp) {
            high--
        }
        arr[low] = arr[high]
        console.log('high = ' + high)
        console.log(arr)

        while (low < high && arr[low] < tmp) {
            low++
        }

        arr[high] = arr[low]
        console.log('low = ' + low)
        console.log(arr)
    }
    arr[low] = tmp
    return low;
}


var arr = [3, 1, 4, 5, 2]

quickSort(arr, 0, arr.length - 1)