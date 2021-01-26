/** Mediator Pattern **/
import {mainGame} from '../main/main.js';

// mainViewMediator 負責中介管理遊戲 dom 相關的行為
// 例如: bind dom 相關的操作等等...
const mainViewMediator = (function () {
    const operations = {};

    operations.initControlButtonsDom = function () {
        const controlButtonsDom = document.getElementsByClassName('control-button')[0];
        mainGame.startButton = controlButtonsDom.querySelector('.start-button');
        mainGame.pauseButton = controlButtonsDom.querySelector('.pause-button');
        mainGame.finishButton = controlButtonsDom.querySelector('.finish-button');
    }

    operations.initCountdownDom = function () {
        mainGame.countdown = document.getElementsByClassName('game-countdown')[0];
        mainGame.countdown.innerHTML = '<span>0</span>';
    }

    // 綁定每個狀態之下的 click event
    operations.bindControlButtonEvent = function () {
        // 將初始化取得的 main 實例的參照, 保存在 mainInstance 變數中,
        // 以防 onclick event 發生時 this 指向被修改成 button dom
        // const mainInstance = this;

        // 將每個 button 點擊後對應要做的事, 委託出去給 currentState 的 handler
        mainGame.startButton.onclick = function () {
            mainGame.currentState.start.clickHandler.call(mainGame);
        }
        mainGame.pauseButton.onclick = function () {
            mainGame.currentState.pause.clickHandler.call(mainGame);
        }
        mainGame.finishButton.onclick = function () {
            mainGame.currentState.finish.clickHandler.call(mainGame);
        }
    };

    operations.updateCountdownDom = function (value) {
        mainGame.countdown.innerHTML = '<span>' + value + '</span>';
    }

    //處理呼叫參數的介面
    const callAction = function () {
        let action = Array.prototype.shift.call(arguments);
        operations[action].apply(this, arguments);
    }

    return {
        callAction: callAction
    };
})();

export {
    mainViewMediator
}
