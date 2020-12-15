/** Strategy Pattern **/

const Operation = function () {}

Operation.prototype.doUp = function (direction) {
    // if (direction.y !== 0) return;
    return {x: 0, y: -1};
};

Operation.prototype.doDown = function (direction) {
    // if (direction.y !== 0) return;
    return {x: 0, y: 1};
};

Operation.prototype.doLeft = function (direction) {
    // if (direction.x !== 0) return;
    return {x: -1, y: 0};
};

Operation.prototype.doRight = function (direction) {
    // if (direction.x !== 0) return;
    return {x: 1, y: 0};
};

const baseOperation = new Operation();

const aSnakeOperation = {
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

const bSnakeOperation = {
    KeyW: function (direction) {
        return baseOperation.doUp(direction);
    },
    KeyS: function (direction) {
        return baseOperation.doDown(direction);
    },
    KeyA: function (direction) {
        return baseOperation.doLeft(direction);
    },
    KeyD: function (direction) {
        return baseOperation.doRight(direction);
    }
}

export {
    aSnakeOperation,
    bSnakeOperation
}

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
