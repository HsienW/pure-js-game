const Operation = function () {}

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

const baseOperation = new Operation();

const aGamerOperation = {
    ArrowUp: function (direction) {
        return baseOperation.doUp(direction);
    },
    ArrowDown: function (direction) {
        return baseOperation.doDown(direction);
    },
    ArrowLeft: function (direction) {
        return baseOperation.doLeft(direction);
    },
    ArrowRight: function (direction) {
        return baseOperation.doRight(direction);
    }
}

export {
    aGamerOperation
}

// const baseOperation = new Operation();
// const aGamerOperation = new GamerOperation(oneOperation);
//
// export {
//     aGamerOperation
// }

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
