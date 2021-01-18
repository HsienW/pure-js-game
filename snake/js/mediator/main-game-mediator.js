/** Mediator Pattern **/

import {mainGame} from '../main/main.js';
import {mainGameAnimation} from '../main/main-game-animation.js';
import {mainGameCountdown} from '../main/main-game-countdown.js';

const mainGameMediator = (function () {
    const operations = {};

    operations.gameInit = function (countdownFinishNumber) {
        mainGameAnimation.animationAction('isInit');
        mainGameCountdown.countdownAction('countdownInit', countdownFinishNumber);
    }

    operations.gameStart = function () {
        mainGameAnimation.animationAction('isStart');
        mainGameCountdown.countdownAction('isStart');
    }

    operations.gamePause = function () {
        mainGameAnimation.animationAction('isPause');
        mainGameCountdown.countdownAction('isPause');
    }

    operations.gameFinish = function () {
        mainGameAnimation.animationAction('isFinish');
        mainGameCountdown.countdownAction('isFinish');
        mainGame.changeStateToFinish();
    }

    //處理呼叫參數的介面
    const callMainGameMediatorAction = function () {
        let action = Array.prototype.shift.call(arguments);
        operations[action].apply(this, arguments);
    }

    return {
        callMainGameMediatorAction: callMainGameMediatorAction
    };
})();

export {
    mainGameMediator
}
