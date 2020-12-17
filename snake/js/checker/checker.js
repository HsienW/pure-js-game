/** Chain of Responsibility Pattern **/

import {outsideMapRule} from './checker-rules.js';

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

const ruleCheckerHandler= (position) => {
    const checkOutsideMapRule = new Checker(outsideMapRule);

    // snakeOutsideMapRule.setNextJudgeHandler(bodyIntersectionRule);

    return checkOutsideMapRule.passJudge(position);
};

export {
    ruleCheckerHandler
}
