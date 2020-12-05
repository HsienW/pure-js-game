// const Operation = function () {
//     this.runDirection = function (operation) {
//         return operation.operation();
//     }
// }
//
// const Up = function () {
//     this.operation = function (direction) {
//         if (direction.y !== 0) return;
//         return {x: 0, y: -1};
//     }
// }
//
// const Down = function () {
//     this.operation = function (direction) {
//         if (direction.y !== 0) return;
//         return {x: 0, y: 1};
//     }
// }
//
// const Left = function () {
//     this.operation = function (direction) {
//         if (direction.x !== 0) return;
//         return {x: -1, y: 0};
//     }
// }
//
// const Right = function () {
//     this.operation = function (direction) {
//         if (direction.x !== 0) return;
//         return {x: 1, y: 0};
//     }
// }

// let direction = {x: 0, y: 0};
// let lastDirection = {x: 0, y: 0};

const operation = {
    up: (direction) => {
        if (direction.y !== 0) return;
        return {x: 0, y: -1};
    },
    down: (direction) => {
        if (direction.y !== 0) return;
        return {x: 0, y: 1};
    },
    left: (direction) => {
        if (direction.x !== 0) return;
        return {x: -1, y: 0};
    },
    right: (direction) => {
        if (direction.x !== 0) return;
        return {x: 1, y: 0};
    }
}

const aGamerOperation = {
    ArrowUp: (direction) => {
        operation.up(direction);
    },
    ArrowDown: (direction) => {
        operation.down(direction);
    },
    ArrowLeft: (direction) => {
        operation.left(direction);
    },
    ArrowRight: (direction) => {
        operation.right(direction);
    }
}

const bGamerOperation = {
    'KeyW': (direction) => {
        operation.up(direction);
    },
    'KeyS': (direction) => {
        operation.down(direction);
    },
    'KeyA': (direction) => {
        operation.left(direction);
    },
    'KeyD': (direction) => {
        operation.right(direction);
    }
}

export {
    aGamerOperation,
    bGamerOperation
}

// const getDirection = () => {
//     lastDirection = direction
//     return lastDirection;
// }
//
// export {
//     getDirection
// }
