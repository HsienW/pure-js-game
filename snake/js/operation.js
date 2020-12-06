const Operation = function (direction, gamerOperation) {
    this.direction = direction;
    this.gamerOperation = gamerOperation;
}

Operation.prototype.doUp = function (direction) {
    if (direction.y !== 0) return;
    return {x: 0, y: -1};
};

Operation.prototype.doDown = function (direction) {
    if (direction.y !== 0) return;
    return {x: 0, y: 1};
};

Operation.prototype.doLeft = function (direction) {
    if (direction.x !== 0) return;
    return {x: -1, y: 0};
};

Operation.prototype.doRight = function (direction) {
    if (direction.x !== 0) return;
    return {x: 1, y: 0};
};

Operation.prototype.getCurrentDirection = function () {
    return this.direction;
};

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

// const operation = {
//     up: (direction) => {
//         if (direction.y !== 0) return;
//         return {x: 0, y: -1};
//     },
//     down: (direction) => {
//         if (direction.y !== 0) return;
//         return {x: 0, y: 1};
//     },
//     left: (direction) => {
//         if (direction.x !== 0) return;
//         return {x: -1, y: 0};
//     },
//     right: (direction) => {
//         if (direction.x !== 0) return;
//         return {x: 1, y: 0};
//     }
// }

const oneOperation = {
    ArrowUp: function () {
        this.doUp(this.direction);
    },
    ArrowDown: function () {
        this.doDown(this.direction);
    },
    ArrowLeft: function () {
        this.doLeft(this.direction);
    },
    ArrowRight: function () {
        this.doRight(this.direction);
    }
}

const aGamerOperation = new Operation({x: 0, y: 0}, oneOperation);

export {
    aGamerOperation
}

// const aGamerOperation = {
//     ArrowUp: (direction) => {
//         operation.up(direction);
//     },
//     ArrowDown: (direction) => {
//         operation.down(direction);
//     },
//     ArrowLeft: (direction) => {
//         operation.left(direction);
//     },
//     ArrowRight: (direction) => {
//         operation.right(direction);
//     }
// }
//
// const bGamerOperation = {
//     'KeyW': (direction) => {
//         operation.up(direction);
//     },
//     'KeyS': (direction) => {
//         operation.down(direction);
//     },
//     'KeyA': (direction) => {
//         operation.left(direction);
//     },
//     'KeyD': (direction) => {
//         operation.right(direction);
//     }
// }

// export {
//     aGamerOperation,
//     bGamerOperation
// }

// const getDirection = () => {
//     lastDirection = direction
//     return lastDirection;
// }
//
// export {
//     getDirection
// }
