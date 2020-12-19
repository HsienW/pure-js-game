import {checkOnSnakeBody} from '../common/util.js';

const eatFoodRule = function (foodPosition, snakeList) {
    const eatFoodSnake = checkOnSnakeBody(foodPosition, snakeList);
    return eatFoodSnake ? eatFoodSnake : 'next';
}

export {
    eatFoodRule
}
