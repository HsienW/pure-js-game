import {getRandomPosition, checkFoodOnSnakeBody, getRandomFoodType} from '../common/util.js';
import {gameJudge} from '../judge/judge.js';
import {map} from './map.js';

const Food = function (foodPosition, foodType, bodyExpandRate) {
    this.foodPosition = foodPosition;
    this.foodType = foodType;
    // 吃到食物後, 蛇身體會增長的格子數
    this.bodyExpandRate = bodyExpandRate;
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

Food.prototype.getFoodBodyExpandRate = function () {
    return this.bodyExpandRate;
}

// Food.prototype.updateFoodPosition = function () {
//     this.foodPosition = this.createFoodPosition();
// }

Food.prototype.updateFoodPosition = function (allSnake) {
    // 檢查蛇是否有吃到食物
    let eatFoodSnakes = checkFoodOnSnakeBody(this, allSnake);
    if (eatFoodSnakes.length !== 0) {
        gameJudge.noticeJudgeAction('snakeEatFood', this, eatFoodSnakes);
        // 有吃到的話就重新 render 食物的位子
        this.foodPosition = this.createFoodPosition();
    }
    eatFoodSnakes.length = 0;
}

Food.prototype.renderFood = function () {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.foodPosition.y;
    foodElement.style.gridColumnStart = this.foodPosition.x;
    foodElement.classList.add('food');
    map.gameMap.appendChild(foodElement);
}

const foodAInitPosition = getRandomPosition();
const foodBInitPosition = getRandomPosition();

const snakeFactory = function (foodPosition, foodType, bodyExpandRate) {

    console.log(getRandomFoodType(2));

    const newFood = new Food(foodPosition, foodType, bodyExpandRate);
    gameJudge.noticeJudgeAction('addFood', newFood);
    return newFood;
}

const foodA = snakeFactory(foodAInitPosition, 'general', 1);
const foodB = snakeFactory(foodBInitPosition, 'general', 1);

export {
    foodA,
    foodB
}
