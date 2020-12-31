import {
    getRandomPosition,
    getRandomFoodAmount,
    getRandomFoodType,
    checkFoodOnSnakeBody,
} from '../common/util.js';
import {foodTypeInfo} from '../role-config/food-type.js';
import {gameJudge} from '../judge/judge.js';
import {map} from './map.js';

const Food = function (foodPosition, foodType, foodStyleName, bodyExpandRate, speedRate) {
    this.foodPosition = foodPosition;
    this.foodType = foodType;
    this.foodStyleName = foodStyleName;
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

Food.prototype.updateFood = function () {
    // 檢查蛇是否有吃到食物
    let allSnake = gameJudge.getJudgeData('getAllSnake');
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
    foodElement.classList.add(this.foodStyleName);
    map.gameMap.appendChild(foodElement);
}

const foodFactory = function (foodPosition, foodType, foodStyleName, bodyExpandRate, speedRate) {
    const newFood = new Food(foodPosition, foodType, foodStyleName, bodyExpandRate, speedRate);
    gameJudge.noticeJudgeAction('addFood', newFood);
    return newFood;
}

const initFoodAmount = getRandomFoodAmount(4);

const initAllFood = function () {
    for (let i = 0; i < initFoodAmount; i++) {
        const initPosition = getRandomPosition();
        const initFoodTypeInfo = foodTypeInfo[getRandomFoodType(3)](1, 1);
        foodFactory(
            initPosition,
            initFoodTypeInfo.type,
            initFoodTypeInfo.styleName,
            initFoodTypeInfo.expandRate,
            initFoodTypeInfo.speedRate
        );
    }
}

const callAllFoodItemMethod = function (...args) {
    const allFood = gameJudge.getJudgeData('getAllFood');
    for (let foodType in allFood) {
        let foods = allFood[foodType];
        foods.forEach((foodItem) => {
            foodItem[args]();
        });
    }
}

const updateAllFood = function () {
    callAllFoodItemMethod('updateFood');
}

const renderAllFood = function () {
    callAllFoodItemMethod('renderFood');
}

export {
    initAllFood,
    updateAllFood,
    renderAllFood
}
