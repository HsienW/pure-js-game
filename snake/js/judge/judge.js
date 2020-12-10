/** Chain of Responsibility Pattern **/

import {outsideMapRule} from './judge-rules.js';

const Judge = function (currentJudgeHandler) {
    this.currentJudgeHandler = currentJudgeHandler;
    this.nextJudgeHandler = null;
}

Judge.prototype.setNextJudgeHandler = function (nextHandler) {
    this.nextJudgeHandler = nextHandler;
    return nextHandler;
}

Judge.prototype.passJudge = function (...args) {
    // ...args 把傳進來的所有參數變成一個陣列, 之後都交由 currentJudgeHandler 也就是當前的職責方法執行
    const result = this.currentJudgeHandler(...args);

    // 若 result 回傳的結果是 next 的話, 去判斷有沒有指定 nextJudgeHandler
    // 有的話就執行, 沒有的話直接回傳 result
    if (result === 'next') {
        return this.nextJudgeHandler && this.nextJudgeHandler.passJudge(...args);
    }
    return result;
}


// const httpErrorHandler = (error) => {
//     const chainRequest400 = new Chain(response400);
//     const chainRequest401 = new Chain(response401);
//     const chainRequest403 = new Chain(response403);
//     const chainRequest404 = new Chain(response404);
//
//     chainRequest400
//         .setSuccessor(chainRequest401)
//         .setSuccessor(chainRequest403)
//         .setSuccessor(chainRequest404);
//
//     chainRequest400.passRequest(error);
// };

const snakeJudgeHandler= (position) => {
    const snakeOutsideMapRule = new Judge(outsideMapRule);

    // snakeOutsideMapRule.setNextJudgeHandler(bodyIntersectionRule);

    snakeOutsideMapRule.passJudge(position);
};

export {
    snakeJudgeHandler
}
