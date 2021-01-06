import {gameMain} from './main.js';

const BaseState = function () {};

// BaseState 用來當子類沒有加到正確的 Handler 時的提醒, 所以 throw 一個 error
BaseState.prototype.clickStartHandler = function () {
    throw new Error('子類別要覆蓋此方法');
};

BaseState.prototype.clickPauseHandler = function () {
    throw new Error('子類別要覆蓋此方法');
};

BaseState.prototype.clickFinishHandler = function () {
    throw new Error('子類別要覆蓋此方法');
};

// stateFactory 用來創建子類
const stateFactory = (function () {
    return function (args) {
        const NewState = function () {};

        // 先將 BaseState 的實例, 掛在新子類的 prototype 上, 以便拿到屬性與共用的 function
        NewState.prototype = new BaseState();

        // 針對新子類的 prototype 掛上對應的 handler
        for (let i in args) {
            NewState.prototype[i] = args[i];
        }
        return NewState;
    }
})();

const GameStartState = stateFactory({
    clickStartHandler: function () {
        console.log('開始中, 無法再次開始');
    },
    clickPauseHandler: function () {
        gameMain.gamePause();
        console.log('暫停遊戲');
    },
    clickFinishHandler: function () {
        console.log('遊戲中, 無法直接結束, 請先暫停再結束');
    }
});

const GamePauseState = stateFactory({
    clickStartHandler: function () {
        gameMain.gameStart();
        console.log('開始遊戲');
    },
    clickPauseHandler: function () {
        console.log('暫停中, 無法再次暫停');
    },
    clickFinishHandler: function () {
        gameMain.gameFinish();
        console.log('結束遊戲');
    }
});

const GameFinishState = stateFactory({
    clickStartHandler: function () {
        gameMain.gameStart();
        console.log('開始遊戲');
    },
    clickPauseHandler: function () {
        console.log('結束中, 無法直接暫停, 請先開始再暫停');
    },
    clickFinishHandler: function () {
        console.log('結束中, 無法再次結束');
    }
});

export {
    GameStartState,
    GamePauseState,
    GameFinishState
}
