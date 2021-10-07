// TO-DO NO SE ESTA USANDO ESTE ARCHIVO, SE PODRIA ELIMINAR
const orderByName = (items) => {
    // if(typeof array === 'object'){
    //     array.sort();
    // }
    items.sort(function (a, b) {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });
}

// export default orderByName;