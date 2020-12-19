import {getRandomPosition, checkOnSnakeBody} from '../common/util.js';
// import {snakeA} from './snake.js';

const Food = function (foodPosition, addBodyRate) {
    this.foodPosition = foodPosition;
    // 吃到食物後, 蛇身體會增長的格子數
    this.addBodyRate = addBodyRate;
}

Food.prototype.createFoodPosition = function () {
    let newFoodPosition;
    while (newFoodPosition === null || newFoodPosition === undefined) {
        newFoodPosition = getRandomPosition();
    }
    return newFoodPosition;
}

Food.prototype.getFoodPosition = function () {
    return this.foodPosition;
}

// Food.prototype.updateFood = function (snakeList) {
//     // 檢查蛇是否有吃到食物
//     let isExpandSnake = checkOnSnakeBody(this.foodPosition, snakeList);
//     if (isExpandSnake.length !== 0) {
//         // 有吃到的話就增長蛇身體, 並且重新產生食物
//         isExpandSnake[0].expandSnakeBody(this.addBodyRate);
//         this.foodPosition = this.createFoodPosition();
//     }
//     isExpandSnake.length = 0;
// }

Food.prototype.updateFood = function (snakeList) {
    // 檢查蛇是否有吃到食物
    let isExpandSnake = checkOnSnakeBody(this.foodPosition, snakeList);
    if (isExpandSnake.length !== 0) {
        // 有吃到的話就增長蛇身體, 並且重新產生食物
        isExpandSnake[0].expandSnakeBody(this.addBodyRate);
        this.foodPosition = this.createFoodPosition();
    }
    isExpandSnake.length = 0;
}

Food.prototype.renderFood = function (map) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.foodPosition.y;
    foodElement.style.gridColumnStart = this.foodPosition.x;
    foodElement.classList.add('food');
    map.appendChild(foodElement);
}

const foodAInitPosition = getRandomPosition();
const foodBInitPosition = getRandomPosition();

const foodA = new Food(foodAInitPosition, 1);
const foodB = new Food(foodBInitPosition, 1);

export {
    foodA,
    foodB
}
