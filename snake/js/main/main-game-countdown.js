// import {gameTimerTypeInfo} from '../role-config/timer-type.js';

const mainGameCountdown = (function () {
    let activation = null;
    let startTime = null;
    let finishTime = null;
    let lastTimeStamp = null;
    let progress = null;
    const operations = {};

    operations.countdownLoop = function (timeStamp) {
        if (!startTime) {
            startTime = timeStamp;
        }
        lastTimeStamp = Math.floor((timeStamp - startTime) / 1000);

        progress = finishTime - lastTimeStamp;

        // console.log(progress);
        operations.isStart();
        operations.checkFinish();
    }

    operations.setFinishTime = function (countdownFinishNumber) {
        finishTime = countdownFinishNumber;
    }

    operations.isStart = function () {
        activation = requestAnimationFrame(operations.countdownLoop.bind(this));
    }

    operations.isPause = function () {
        cancelAnimationFrame(activation);
    }

    operations.checkFinish = function () {
        if (progress === 0) {
            cancelAnimationFrame(activation);
            return 'game-over'
        }
        return false;
    }

    const countdownAction = function () {
        let action = Array.prototype.shift.call(arguments);
        operations[action].apply(this, arguments);
    }

    return {
        countdownAction: countdownAction
    }

})();

export {
    mainGameCountdown
}


// const Timer = function (timerId, timerStopNumber) {
//     this.timerId = timerId;
//     this.timerStopNumber = timerStopNumber;
//     this.timerActivation = null;
//     this.count = null;
// }
//
// Timer.prototype.countdownLoop = function (secondRender) {
//     if (secondRender < 1) {
//         return;
//     }
//     this.timerActivation = null;
//     this.count = Math.floor((secondRender / 1000));
//     this.timerStart();
// }
//
// Timer.prototype.getTimerStopNumber = function () {
//     return this.timerStopNumber;
// }
//
// Timer.prototype.getTimerCount = function () {
//     return this.count;
// }
//
// Timer.prototype.timerStart = function () {
//     if (!this.timerActivation) {
//         this.timerActivation = window.requestAnimationFrame(this.countdownLoop.bind(this));
//     }
// }
//
// Timer.prototype.timerStop = function () {
//     if (this.timerActivation) {
//         window.cancelAnimationFrame(this.timerActivation);
//         this.timerActivation = null;
//     }
// }
//
// const timerFactory = function (timerId, count) {
//     let newTimer = new Timer(timerId, count);
//     // mediator.noticeJudgeAction('addTimer', newTimer);
//     return newTimer;
// }
//
// const initGameTimerType = gameTimerTypeInfo['normalPlay']();
// const globalGameTimer = timerFactory(initGameTimerType.timerId, initGameTimerType.timerStopNumber);
//
// const globalGameTimerStart = function () {
//     globalGameTimer.timerStart();
// }
//
// const globalGameTimerStop = function () {
//     globalGameTimer.timerStop();
// }
//
// const checkGlobalGameTimeFinish = function () {
//     return globalGameTimer.getTimerCount() >= globalGameTimer.getTimerStopNumber();
// }
//
// // const initGlobalGameTimer = function () {
// //     const initGameTimer = gameTimerTypeInfo['normalPlay']('global-game-time');
// //     let newTimer = new Timer(initGameTimer.timerId, initGameTimer.gameTime);
// //     newTimer.timerStart();
// //     // timerFactory(initGameTimer.timerId, initGameTimer.gameTime);
// // }
//
// export {
//     globalGameTimer,
//     checkGlobalGameTimeFinish,
//     globalGameTimerStart,
//     globalGameTimerStop
//     // checkGlobalGameTime
//     // initGlobalGameTimer
// }
