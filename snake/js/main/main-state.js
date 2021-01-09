import {mainAnimation} from './main-animation.js';
import {gameJudge} from '../judge/judge.js';

const gameStartState = {
    start: {
        clickHandler: function () {
            console.log('開始中, 無法再次開始');
        }
    },
    pause: {
        clickHandler: function () {
            console.log('暫停遊戲');
            mainAnimation.doAnimationAction('isPause');
            this.currentState = gamePauseState;
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
            mainAnimation.doAnimationAction('isStart');
            this.currentState = gameStartState;
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
            mainAnimation.doAnimationAction('isFinish');
            this.currentState = gameFinishState;
        }
    }
}

const gameFinishState = {
    start: {
        clickHandler: function () {
            console.log('開始遊戲');
            gameJudge.noticeJudgeAction('clearAllFood', this);
            gameJudge.noticeJudgeAction('clearAllSnake', this);
            gameJudge.noticeJudgeAction('clearAllTimer', this);

            mainAnimation.doAnimationAction('isInit');
            mainAnimation.doAnimationAction('isStart');

            this.currentState = gameStartState;
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
