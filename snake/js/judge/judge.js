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

Judge.prototype.checkSnakeSelfExpand = function (foodPosition, snakeList) {
    const isExpandSnake = expandRuleChecker(foodPosition, snakeList);
    // 執行正確的蛇身狀態改變
    // if(isExpandSnake.length !== 0) {
    //     isExpandSnake[0].expandSnakeBody(this.addBodyRate);
    // }
    // return expandRuleChecker(foodPosition, snakeList);

//     if (isExpandSnake.length !== 0) {
// //         // 有吃到的話就增長蛇身體, 並且重新產生食物
// //         isExpandSnake[0].expandSnakeBody(this.addBodyRate);
// //         this.foodPosition = this.createFoodPosition();
// //     }
};

Judge.prototype.checkSnakeSelfGameOver = function (snake) {
    const snakeHeadPosition = snake.getSnakeHead();
    return gameOverRuleChecker(snakeHeadPosition);
};

const gameJudge = new Judge();

export {
    gameJudge
}

//
// Judge.prototype.setNextJudgeHandler = function (nextHandler) {
//     this.nextJudgeHandler = nextHandler;
//     return nextHandler;
// }
//
// Judge.prototype.passJudge = function (...args) {
//     // ...args 把傳進來的所有參數變成一個陣列, 之後都交由 currentJudgeHandler 也就是當前的職責方法執行
//     const result = this.currentJudgeHandler(...args);
//
//     // 若 result 回傳的結果是 next 的話, 去判斷有沒有指定 nextJudgeHandler
//     // 有的話就執行, 沒有的話直接回傳 result
//     if (result === 'next') {
//         return this.nextJudgeHandler && this.nextJudgeHandler.passJudge(...args);
//     }
//     return result;
// }
//
// const snakeJudgeHandler= (position) => {
//     const snakeOutsideMapRule = new Judge(outsideMapRule);
//
//     // snakeOutsideMapRule.setNextJudgeHandler(bodyIntersectionRule);
//
//     return snakeOutsideMapRule.passJudge(position);
// };
//
// export {
//     snakeJudgeHandler
// }
