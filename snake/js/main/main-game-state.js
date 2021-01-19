import {mainGameMediator} from '../mediator/main-game-mediator.js';
import {roleMediator} from '../mediator/role-mediator.js';

const gameStartState = {
    start: {
        clickHandler: function () {
            console.log('開始中, 無法再次開始');
        }
    },
    pause: {
        clickHandler: function () {
            console.log('暫停遊戲');
            mainGameMediator.callMainGameMediatorAction('gamePause');
        }
    },
    finish: {
        clickHandler: function () {
            console.log('遊戲中, 無法直接結束, 請先暫停再結束');
        }
    }
}

const gamePauseState = {
    start: {
        clickHandler: function () {
            console.log('繼續遊戲');
            mainGameMediator.callMainGameMediatorAction('gameStart');
        }
    },
    pause: {
        clickHandler: function () {
            console.log('暫停中, 無法再次暫停');
        }
    },
    finish: {
        clickHandler: function () {
            console.log('結束遊戲');
            mainGameMediator.callMainGameMediatorAction('gameFinish');
        }
    }
}

const gameFinishState = {
    start: {
        clickHandler: function () {
            console.log('開始遊戲');
            roleMediator.callRoleMediatorAction('clearAllRole', this);
            mainGameMediator.callMainGameMediatorAction('gameInit', 20);
            mainGameMediator.callMainGameMediatorAction('gameStart');
        }
    },
    pause: {
        clickHandler: function () {
            console.log('結束中, 無法直接暫停, 請先開始再暫停');
        }
    },
    finish: {
        clickHandler: function () {
            console.log('結束中, 無法再次結束');
        }
    }
}

export {
    gameStartState,
    gamePauseState,
    gameFinishState
}
