import {randomLayoutPosition} from './layout.js';
import {checkOnSnakeBody} from './util.js';
import {snakeBody, addSnakeBody} from './snake.js';

const addBodyRate = 5;

const createFoodPosition = () => {
    let newFoodPosition;
    while (newFoodPosition === null || newFoodPosition === undefined) {
        newFoodPosition = randomLayoutPosition();
    }
    return newFoodPosition;
}

let food = createFoodPosition();

export const updateFood = () => {
    if (checkOnSnakeBody(food, snakeBody)) {
        addSnakeBody(addBodyRate);
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
