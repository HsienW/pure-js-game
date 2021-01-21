/** State Pattern **/

import {gameFinishState} from './main-game-state.js';

const Main = function () {
    this.startButton = null;
    this.pauseButton = null;
    this.finishButton = null;
    // 設定初始狀態
    this.currentState = gameFinishState;
}

Main.prototype.initMainGame = function () {
    this.controlAreaDom = document.getElementById('control-button');

    this.startButton = this.controlAreaDom.querySelector('.start-button');
    this.pauseButton = this.controlAreaDom.querySelector('.pause-button');
    this.finishButton = this.controlAreaDom.querySelector('.finish-button');

    this.bindMainEvent();
}

// 綁定每個狀態之下的 click event
Main.prototype.bindMainEvent = function () {
    // 將初始化取得的 main 實例的參照, 保存在 mainInstance 變數中,
    // 以防 onclick event 發生時 this 指向被修改成 button dom
    const mainInstance = this;

    // 將每個 button 點擊後對應要做的事, 委託出去給 currentState 的 handler
    this.startButton.onclick = function () {
        mainInstance.currentState.start.clickHandler.call(mainInstance);
    }
    this.pauseButton.onclick = function () {
        mainInstance.currentState.pause.clickHandler.call(mainInstance);
    }
    this.finishButton.onclick = function () {
        mainInstance.currentState.finish.clickHandler.call(mainInstance);
    }
};

Main.prototype.changeState = function (newState) {
    this.currentState = newState;
}

const mainGame = new Main();

mainGame.initMainGame();

export {
    mainGame,
}
