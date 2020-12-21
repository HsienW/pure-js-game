/** Mediator Pattern **/

import {expandRuleChecker, gameOverRuleChecker} from '../checker/checker.js';

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

Judge.prototype.callRoleMethod = function (roleData, methodName) {
    for (let i = 0; i < roleData.length; i++) {
        roleData[i][methodName]();
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
    for (let i = 0; i < allSnake.length; i++) {
        let snakeHeadPosition = allSnake[i].getSnakeHeadPosition();
        if (gameOverRuleChecker(snakeHeadPosition)) {
            if (confirm('Is Game Over. Press ok to restart!')) {
            }
        }
    }
};

Judge.prototype.updateGameRenderData = function () {
    let gameFoods = this.getAllFood();
    let gameSnakes = this.getAllSnake();
    this.callRoleMethod(gameSnakes, 'updateSnakePosition')
    this.checkSnakeSelfExpand(gameFoods, gameSnakes);
    this.checkSnakeSelfGameOver(gameSnakes);
};

Judge.prototype.initGameRender = function () {
    let gameSnakes = this.getAllSnake();
    this.callRoleMethod(gameSnakes, 'initListenerOperation');
};

Judge.prototype.doGameRender = function () {
    let gameFoods = this.getAllFood();
    let gameSnakes = this.getAllSnake();
    this.callRoleMethod(gameFoods, 'renderFood');
    this.callRoleMethod(gameSnakes, 'renderSnake');
};

const gameJudge = new Judge();

export {
    gameJudge
}
