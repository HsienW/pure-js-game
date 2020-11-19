import {randomLayoutPosition} from './layout.js';

const createFoodPosition = () => {
    let newFoodPosition;
    while (newFoodPosition === null) {
        newFoodPosition = randomLayoutPosition();
    }
    return newFoodPosition;
}

export const renderFood = (map) => {
    let food = createFoodPosition();
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    map.appendChild(foodElement);
}
