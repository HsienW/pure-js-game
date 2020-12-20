/** Mediator Pattern **/

import {expandRuleChecker, gameOverRuleChecker} from '../checker/checker.js';

const Judge = function () {
    this.allSnake = [];
    // this.allSnake = {};
}

Judge.prototype.addSnake = function (snake) {
    this.allSnake.push(snake);
    // this.allSnake[snake.snakeName] = snake || {};
};

Judge.prototype.getAllSnake = function () {
    return this.allSnake;
};

Judge.prototype.checkSnakeSelfExpand = function (allFood, allSnake) {
    const isExpandSnake = expandRuleChecker(allFood, allSnake);
    // 執行正確的蛇身狀態改變
    if (isExpandSnake.length !== 0) {
        const addBodyRate = isExpandSnake[0]['food'].getFoodAddBodyRate();
        isExpandSnake[0]['snake'].expandSnakeBody(addBodyRate);
    }
    isExpandSnake.length = 0;
};

Judge.prototype.checkSnakeSelfGameOver = function (snake) {
    const snakeHeadPosition = snake.getSnakeHead();
    if (gameOverRuleChecker(snakeHeadPosition)) {
        if (confirm('Is Game Over. Press ok to restart!')) {}
    }
};

const gameJudge = new Judge();

export {
    gameJudge
}
