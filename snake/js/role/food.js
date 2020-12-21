import {getRandomPosition, checkOnSnakeBody} from '../common/util.js';
import {gameJudge} from '../judge/judge.js';

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

Food.prototype.getFoodAddBodyRate = function () {
    return this.addBodyRate;
}

Food.prototype.updateFoodPosition = function () {
    this.foodPosition = this.createFoodPosition();
}

// Food.prototype.updateFoodPosition = function (snakeList) {
//     // todo this ExpandSnake should move to judge
//     // 檢查蛇是否有吃到食物
//     let isExpandSnake = checkOnSnakeBody(this.foodPosition, snakeList);
//     if (isExpandSnake.length !== 0) {
//         // 有吃到的話就增長蛇身體, 並且重新產生食物
//         isExpandSnake[0].expandSnakeBody(this.addBodyRate);
//         this.foodPosition = this.createFoodPosition();
//     }
//     isExpandSnake.length = 0;
// }

Food.prototype.renderFood = function (map) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.foodPosition.y;
    foodElement.style.gridColumnStart = this.foodPosition.x;
    foodElement.classList.add('food');
    map.appendChild(foodElement);
}

const foodAInitPosition = getRandomPosition();
const foodBInitPosition = getRandomPosition();

const snakeFactory = function (foodPosition, addBodyRate) {
    const newFood = new Food(foodPosition, addBodyRate);
    gameJudge.addFood(newFood);
    return newFood;
}

const foodA = snakeFactory(foodAInitPosition, 1);
const foodB = snakeFactory(foodBInitPosition, 1);

export {
    foodA,
    foodB
}
