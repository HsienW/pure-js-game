import {checkPositionOutsideMap, checkPositionOnSnakeBody} from '../common/util.js';

const outsideMapRule = function (position) {
    const outsideMapSnake = checkPositionOutsideMap(position);
    return outsideMapSnake ? 'game-over' : 'next';
}

const bodyCollideRule = function (position, snakeBody) {
    const bodyCollideInfo = checkPositionOnSnakeBody(position, snakeBody);
    return bodyCollideInfo ? 'game-over' : 'next';
}

export {
    outsideMapRule,
    bodyCollideRule
}
