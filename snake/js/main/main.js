/** State Pattern **/

import {gameFinishState} from './main-game-state.js';
import {mainViewMediator} from '../mediator/main-view-mediator.js';

const Main = function () {
    this.startButton = null;
    this.pauseButton = null;
    this.finishButton = null;
    // 設定初始狀態
    this.currentState = gameFinishState;
}

Main.prototype.changeState = function (newState) {
    this.currentState = newState;
}

Main.prototype.initMainGameView = function () {
    mainViewMediator.callAction('initControlButtonsDom');
    mainViewMediator.callAction('initCountdownDom');
    mainViewMediator.callAction('initTeamScoreDom');
    mainViewMediator.callAction('bindControlButtonEvent');
}

const mainGame = new Main();

mainGame.initMainGameView();

export {
    mainGame,
}
