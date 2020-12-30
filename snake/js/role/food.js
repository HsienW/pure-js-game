import {
    getRandomPosition,
    getRandomFoodAmount,
    getRandomFoodType,
    checkFoodOnSnakeBody,
} from '../common/util.js';
import {foodTypeInfo} from '../role-config/food-type.js';
import {gameJudge} from '../judge/judge.js';
import {map} from './map.js';

const Food = function (foodPosition, foodType, bodyExpandRate, speedRate) {
    this.foodPosition = foodPosition;
    this.foodType = foodType;
    // 吃到食物後, 蛇身體會增長的格子數
    this.bodyExpandRate = bodyExpandRate;
    // 吃到食物後, 蛇會變成多塊的移動速度
    this.speedRate = speedRate;
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

Food.prototype.updateFood = function (allSnake) {
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

const foodFactory = function (foodPosition, foodType, bodyExpandRate, speedRate) {
    const newFood = new Food(foodPosition, foodType, bodyExpandRate, speedRate);
    gameJudge.noticeJudgeAction('addFood', newFood);
    return newFood;
}

const initFoodAmount = getRandomFoodAmount(3);

const initAllFood = function () {
    for (let i = 0; i < initFoodAmount; i++) {
        const initPosition = getRandomPosition();
        const initFoodTypeInfo = foodTypeInfo[getRandomFoodType(3)](1, 1);
        foodFactory(initPosition, initFoodTypeInfo.type, initFoodTypeInfo.expandRate, initFoodTypeInfo.speedRate);
    }
}

const updateAllFood = function (snakeList) {
    const allFood = gameJudge.getJudgeData('getAllFood');
    for (let foodType in allFood) {
        let foods = allFood[foodType];
        foods.forEach((foodItem) => {
            foodItem['updateFood'](snakeList);
        });
    }
}

const renderAllFood = function () {
    const allFood = gameJudge.getJudgeData('getAllFood');
    for (let foodType in allFood) {
        let foods = allFood[foodType];
        foods.forEach((foodItem) => {
            foodItem['renderFood']();
        });
    }
}

export {
    initAllFood,
    updateAllFood,
    renderAllFood
}
