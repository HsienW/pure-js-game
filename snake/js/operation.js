let direction = {x: 0, y: 0};
let lastDirection = {x: 0, y: 0};

// const Operation = function () {
//     this.direction = function (operationStrategy) {
//         return operationStrategy.operation();
//     }
// }
//
// const ArrowUp = function () {
//     this.operation = function () {
//         if (lastDirection.y !== 0) return;
//         return {x: 0, y: -1};
//     }
// }
//
// const ArrowDown = function () {
//     this.operation = function () {
//         if (lastDirection.y !== 0) return;
//         return {x: 0, y: 1};
//     }
// }

export const operation = {
    'ArrowUp': () => {
        if (lastDirection.y !== 0) return;
        return {x: 0, y: -1};
    },
    'ArrowDown': () => {
        if (lastDirection.y !== 0) return;
        return {x: 0, y: 1};
    },
    'ArrowLeft': () => {
        if (lastDirection.x !== 0) return;
        return {x: -1, y: 0};
    },
    'ArrowRight': () => {
        if (lastDirection.x !== 0) return;
        return {x: 1, y: 0};
    }
}

window.addEventListener('keydown', event => {
    direction = operation[event.key]();
});

export function getDirection() {
    lastDirection = direction
    return lastDirection;
}
