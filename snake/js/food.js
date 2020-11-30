import {randomMapPosition} from './map.js';
import {checkOnSnakeBody} from './util.js';
import {snakeBody, expandSnakeBody} from './snake.js';

// 吃到食物後, 蛇身體會增長的格子數
const addBodyRate = 1;

const createFoodPosition = () => {
    let newFoodPosition;
    while (newFoodPosition === null || newFoodPosition === undefined) {
        newFoodPosition = randomMapPosition();
    }
    return newFoodPosition;
}

let food = createFoodPosition();

export const updateFood = () => {
    // 檢查蛇是否有吃到食物
    if (checkOnSnakeBody(food, snakeBody)) {
        // 有吃到的話就增長蛇身體, 並且重新產生食物
        expandSnakeBody(addBodyRate);
        food = createFoodPosition();
    }
}

export const renderFood = (map) => {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    map.appendChild(foodElement);
}
