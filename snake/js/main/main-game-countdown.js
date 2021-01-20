import {mainGameMediator} from '../mediator/main-game-mediator.js';

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
        operations.checkCountdownFinish();
    }

    operations.countdownInit = function (countdownFinishNumber) {
        finishTime = countdownFinishNumber;
    }

    operations.isStart = function () {
        activation = requestAnimationFrame(operations.countdownLoop.bind(this));
    }

    operations.isPause = function () {
        cancelAnimationFrame(activation);
    }

    operations.isFinish = function () {
        cancelAnimationFrame(activation);
    }

    operations.checkCountdownFinish = function () {
        if (progress === 0) {
            console.log('時間到');
            mainGameMediator.callAction('gameFinish');
        }
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
