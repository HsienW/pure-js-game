import {randomMapPosition} from './map.js';
import {checkOnSnakeBody} from './util.js';
// import {snakeA} from './snake.js';

const Food = function (foodPosition, addBodyRate) {
    this.foodPosition = foodPosition;
    // 吃到食物後, 蛇身體會增長的格子數
    this.addBodyRate = addBodyRate;
}

Food.prototype.createFoodPosition = function () {
    let newFoodPosition;
    while (newFoodPosition === null || newFoodPosition === undefined) {
        newFoodPosition = randomMapPosition();
    }
    return newFoodPosition;
}

Food.prototype.updateFood = function (snakeList) {
    // 檢查蛇是否有吃到食物
    let isExpandSnake = checkOnSnakeBody(this.foodPosition, snakeList);
    if (isExpandSnake.length !== 0) {
        // 有吃到的話就增長蛇身體, 並且重新產生食物
        isExpandSnake[0].expandSnakeBody(this.addBodyRate);
        isExpandSnake.length = 0;
        this.foodPosition = this.createFoodPosition();
    }
}

Food.prototype.renderFood = function (map) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.foodPosition.y;
    foodElement.style.gridColumnStart = this.foodPosition.x;
    foodElement.classList.add('food');
    map.appendChild(foodElement);
}

const initFoodPosition = randomMapPosition();
const food = new Food(initFoodPosition, 1);

export {
    food
}


// 吃到食物後, 蛇身體會增長的格子數
// const addBodyRate = 1;
//
// const createFoodPosition = () => {
//     let newFoodPosition;
//     while (newFoodPosition === null || newFoodPosition === undefined) {
//         newFoodPosition = randomMapPosition();
//     }
//     return newFoodPosition;
// }
//
// let food = createFoodPosition();
//
// const updateFood = () => {
//     // 檢查蛇是否有吃到食物
//     if (checkOnSnakeBody(food, snakeA.snakeBody)) {
//         // 有吃到的話就增長蛇身體, 並且重新產生食物
//         snakeA.expandSnakeBody(addBodyRate);
//         food = createFoodPosition();
//     }
// }
//
// const renderFood = (map) => {
//     const foodElement = document.createElement('div');
//     foodElement.style.gridRowStart = food.y;
//     foodElement.style.gridColumnStart = food.x;
//     foodElement.classList.add('food');
//     map.appendChild(foodElement);
// }
//
// export {
//     updateFood,
//     renderFood
// }
