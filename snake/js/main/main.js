/** State Pattern **/

import {gameFinishState} from './main-state.js';

const Main = function () {
    this.startButton = null;
    this.pauseButton = null;
    this.finishButton = null;
    // this.gameStartState = gameStartState;
    // this.gamePauseState = gamePauseState;
    // this.gameFinishState = gameFinishState;
    // 設定初始狀態
    this.currentState = gameFinishState;
}

Main.prototype.initGameMain = function () {
    this.dom = document.createElement('div');
    this.dom.innerHTML = '<button class="start-button">開始遊戲</button> \ <button class="pause-button" >暫停遊戲</button> \ <button class="finish-button" >結束遊戲</button> ';
    document.body.appendChild(this.dom);

    this.startButton = this.dom.querySelector('.start-button');
    this.pauseButton = this.dom.querySelector('.pause-button');
    this.finishButton = this.dom.querySelector('.finish-button');

    this.bindMainEvent();
}

// 綁定每個狀態之下的 click event
Main.prototype.bindMainEvent = function () {
    // 將初始化取得的 main 實例的參照, 保存在 mainInstance 變數中,
    // 以防 onclick event 發生時 this 指向被修改成 button dom
    const mainInstance = this ;

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

const gameMain = new Main();

gameMain.initGameMain();

export {
    gameMain
}
