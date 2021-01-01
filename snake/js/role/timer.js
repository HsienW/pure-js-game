import {gameJudge} from '../judge/judge.js';
import {gameTimerTypeInfo} from '../role-config/timer-type.js';

const Timer = function (timerId, count) {
    this.timerId = timerId;
    this.count = count;
    this.timerActivation = null;
}

Timer.prototype.countdownLoop = function (time) {
    let ms = Math.floor(time / 1000);
    this.count = this.count - ms;

    if (this.count <= 0) {
        this.stop();
    }

    this.start();
}

// Timer.prototype.getCount = function () {
//     return this.count;
// }

Timer.prototype.start = function (countType) {
    if (!this.timerActivation) {
        this.timerActivation = window.requestAnimationFrame(countType);
    }
}

Timer.prototype.stop = function () {
    if (this.timerActivation) {
        window.cancelAnimationFrame(this.timerActivation);
        this.timerActivation = null;
    }
}

// const timerFactory = function (timerId, count) {
//     let newTimer = new Timer(timerId, count);
//     gameJudge.noticeJudgeAction('addTimer', newTimer);
//     return newTimer;
// }

const initGlobalGameTimer = function () {
    const initGameTimer = gameTimerTypeInfo['normalPlay']('global-game-time');
    let newTimer = new Timer(initGameTimer.timerId, initGameTimer.timerId);
    newTimer.start(newTimer.countdownLoop);
    // timerFactory(initGameTimer.timerId, initGameTimer.gameTime);
}

export {
    initGlobalGameTimer
}
