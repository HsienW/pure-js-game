import {randomLayoutPosition} from './layout.js';
import {checkOnSnakeBody} from './util';

let food = createFoodPosition();

const createFoodPosition = () => {
    let newFoodPosition;
    while (newFoodPosition === null || newFoodPosition === undefined) {
        newFoodPosition = randomLayoutPosition();
    }
    return newFoodPosition;
}

export const updateFood = () => {
    if (checkOnSnakeBody(food)) {
        // todo add check update food position
    }
}

export const renderFood = (map) => {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    map.appendChild(foodElement);
}
