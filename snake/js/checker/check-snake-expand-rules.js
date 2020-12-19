import {checkOnSnakeBody} from '../common/util.js';

const eatFoodRule = function (foodPosition, snakeList) {
    return checkOnSnakeBody(foodPosition, snakeList);
}

export {
    eatFoodRule
}
