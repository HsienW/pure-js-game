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
        let snakeHeadPosition = allSnake[i].getSnakeHeadPosition();
        if (gameOverRuleChecker(snakeHeadPosition)) {
            if (confirm('Is Game Over. Press ok to restart!')) {
            }
        }
    }
};

Judge.prototype.initRenderMethod = function (data, renderMethodName) {
    for (let i = 0; i > data.length; i++) {
        data[i][renderMethodName]();
    }
};

Judge.prototype.callRenderMethod = function (data, renderMethodName, map) {
    data.forEach((item) => {item[renderMethodName](map)})
    // for (let i = 0; i > data.length; i++) {
    //     data[i][renderMethodName](map);
    // }
};

Judge.prototype.updateGameRenderData = function () {
    let gameFoods = this.getAllFood();
    let gameSnakes = this.getAllSnake();
    this.checkSnakePositionUpdate(gameSnakes);
    this.checkSnakeSelfExpand(gameFoods, gameSnakes);
    this.checkSnakeSelfGameOver(gameSnakes);
};

Judge.prototype.initGameRender = function () {
    let gameFoods = this.getAllFood();
    let gameSnakes = this.getAllSnake();
    this.initRenderMethod(gameFoods, 'initListenerOperation');
    this.initRenderMethod(gameSnakes, 'initListenerOperation');
};

Judge.prototype.doGameRender = function () {
    console.log('doGameRender-doGameRender-doGameRender');
    let gameFoods = this.getAllFood();
    let gameSnakes = this.getAllSnake();
    this.callRenderMethod(gameFoods, 'renderFood', map.gameMap);
    this.callRenderMethod(gameSnakes, 'renderSnake', map.gameMap);
};

const gameJudge = new Judge();

export {
    gameJudge
}
