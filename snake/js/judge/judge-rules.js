import {mapSize} from '../map.js';

const outsideMapRule = (position) => {
    return (position.x < 1 || position.x > mapSize || position.y < 1 || position.y > mapSize) ? 'game-over' : 'next';
}

// const bodyCollideRule = (checkOnSnakeBody, ignoreHead) => {
//     return checkOnSnakeBody(this.snakeBody[0], this.snakeBody, ignoreHead);
// }

export {
    outsideMapRule,
    // bodyIntersectionRule
}