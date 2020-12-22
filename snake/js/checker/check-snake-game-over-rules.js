import {mapSize} from '../role/map.js';
import {checkPositionOnSnakeBody} from '../common/util.js';

const outsideMapRule = function (position) {
    return (position.x < 1 || position.x > mapSize || position.y < 1 || position.y > mapSize) ? 'game-over' : 'next';
}

const bodyCollideRule = function (position, snakeBody) {
    const bodyCollideItem = checkPositionOnSnakeBody(position, snakeBody);
    return bodyCollideItem ? bodyCollideItem : 'next';
}

export {
    outsideMapRule,
    bodyCollideRule
}
