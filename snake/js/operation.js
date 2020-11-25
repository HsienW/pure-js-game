let direction = {x: 0, y: 0}
let lastDirection = {x: 0, y: 0}

export const operation = {
    'ArrowUp': () => {
        return {x: 0, y: -1};
    },
    'ArrowDown': () => {
        return {x: 0, y: 1};
    },
    'ArrowLeft': () => {
        return {x: -1, y: 0};
    },
    'ArrowRight': () => {
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
