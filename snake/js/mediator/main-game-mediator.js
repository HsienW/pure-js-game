/** Mediator Pattern **/

import {mainGame} from '../main/main.js';
import {mainGameAnimation} from '../main/main-game-animation.js';
import {mainGameCountdown} from '../main/main-game-countdown.js';
import {gameStartState, gamePauseState, gameFinishState} from '../main/main-game-state.js';

// mainGameMediator 負責中間管理遊戲進行相關的行為
// 例如: 初始、進行、暫停、結束相關的呼叫
const mainGameMediator = (function () {
    const operations = {};

    operations.gameInit = function (countdownFinishNumber) {
        console.log('gameInit');
        mainGameAnimation.animationAction('isInit');
        mainGameCountdown.countdownAction('countdownInit', countdownFinishNumber);
    }

    operations.gameStart = function () {
        console.log('gameStart');
        mainGameAnimation.animationAction('isStart');
        mainGameCountdown.countdownAction('isStart');
        mainGame.changeState(gameStartState);
    }

    operations.gamePause = function () {
        console.log('gamePause');
        mainGameAnimation.animationAction('isPause');
        mainGameCountdown.countdownAction('isPause');
        mainGame.changeState(gamePauseState);
    }

    operations.gameFinish = function () {
        console.log('gameFinish');
        mainGameAnimation.animationAction('isFinish');
        mainGameCountdown.countdownAction('isFinish');
        mainGame.changeState(gameFinishState);
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
