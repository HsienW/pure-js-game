/** Chain of Responsibility Pattern **/

// import {eatFoodRule} from './check-snake-expand-rules.js';
import {outsideMapRule, bodyCollideRule} from './check-snake-dead-rules.js';
import {gameTimeFinishRule, onlyOneTeamLeftRule} from './check-game-over-rules.js';

const Checker = function (currentJudgeHandler) {
    this.currentCheckHandler = currentJudgeHandler;
    this.nextCheckHandler = null;
}

Checker.prototype.setNextCheckHandler = function (nextHandler) {
    this.nextCheckHandler = nextHandler;
    return nextHandler;
}

Checker.prototype.passCheck = function (...args) {
    // ...args 把傳進來的所有參數變成一個陣列, 之後都交由 currentCheckerHandler 也就是當前的職責方法執行
    const result = this.currentCheckHandler(...args);

    // 若 result 回傳的結果是 next 的話, 去判斷有沒有指定 nextJudgeHandler
    // 有的話就執行, 沒有的話直接回傳 result
    if (result === 'next') {
        return this.nextCheckHandler && this.nextCheckHandler.passCheck(...args);
    }
    return result;
}

// 檢查蛇是否需要增長身體規則
// const expandRuleChecker = function (allFood, allSnake) {
//     const checkEatFoodRule = new Checker(eatFoodRule);
//
//     return checkEatFoodRule.passCheck(allFood, allSnake);
// };

// 檢查單一隻蛇是否觸發死亡的規則
const snakeDeadRuleChecker = function (position, snakeBody) {
    const checkOutsideMapRule = new Checker(outsideMapRule);
    const checkBodyCollideRule = new Checker(bodyCollideRule);

    checkOutsideMapRule.setNextCheckHandler(checkBodyCollideRule);

    return checkOutsideMapRule.passCheck(position, snakeBody);
};

// 檢查整回合遊戲是否結束的規則
const gameOverRuleChecker = function () {
    const checkTimeFinishRule = new Checker(gameTimeFinishRule);

    checkTimeFinishRule.setNextCheckHandler(onlyOneTeamLeftRule);

    return checkTimeFinishRule.passCheck();
};

export {
    // expandRuleChecker,
    snakeDeadRuleChecker,
    gameOverRuleChecker
}
