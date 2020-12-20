/** Mediator Pattern **/

import {expandRuleChecker, gameOverRuleChecker} from '../checker/checker.js';
import {map} from '../role/map.js';

const Judge = function () {
    this.allFood = [];
    this.allSnake = [];
    // this.allSnake = {};
}

Judge.prototype.getAllFood = function () {
    return this.allFood;
};

Judge.prototype.getAllSnake = function () {
    return this.allSnake;
};

Judge.prototype.addFood = function (food) {
    this.allFood.push(food);
};

Judge.prototype.addSnake = function (snake) {
    this.allSnake.push(snake);
    // this.allSnake[snake.snakeName] = snake || {};
};

Judge.prototype.checkSnakePositionUpdate = function (allSnake) {
    for (let i = 0; i > allSnake.length; i++) {
        allSnake[i].updateSnakePosition();
    }
};

Judge.prototype.checkSnakeSelfExpand = function (allFood, allSnake) {
    const isEatFoodInfo = expandRuleChecker(allFood, allSnake);
    // 執行正確的蛇身狀態改變
    if (isEatFoodInfo.length !== 0) {
        let addBodyRate = isEatFoodInfo[0]['food'].getFoodAddBodyRate();
        isEatFoodInfo[0]['snake'].expandSnakeBody(addBodyRate);
        isEatFoodInfo[0]['food'].updateFoodPosition();
    }
    isEatFoodInfo.length = 0;
};

Judge.prototype.checkSnakeSelfGameOver = function (allSnake) {
    for (let i = 0; i > allSnake.length; i++) {
        let snakeHeadPosition = allSnake[i].getSnakeHead();
        if (gameOverRuleChecker(snakeHeadPosition)) {
            if (confirm('Is Game Over. Press ok to restart!')) {
            }
        }
    }
};

Judge.prototype.doRenderData = function (data, renderMethodName, map) {
    for (let i = 0; i > data.length; i++) {
        data[i][renderMethodName](map);
    }
};

Judge.prototype.updateGameRenderData = function () {
    let gameFoodsData = this.getAllFood();
    let gameSnakesData = this.getAllSnake();
    this.checkSnakePositionUpdate(gameSnakesData);
    this.checkSnakeSelfExpand(gameFoodsData, gameSnakesData);
    this.checkSnakeSelfGameOver(gameSnakesData);
};

Judge.prototype.doGameRender = function () {
    let gameMap = map.gameMap;
    let gameFoodsData = this.getAllFood();
    let gameSnakesData = this.getAllSnake();
    this.doRenderData(gameFoodsData, 'renderFood', gameMap);
    this.doRenderData(gameSnakesData, 'renderSnake', gameMap);
};

const gameJudge = new Judge();

export {
    gameJudge
}
