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

const MainStateFactory = (function () {
    return function (args) {
        const Factory = function () {};

        Factory.prototype = new BaseState();

        for (let i in args) {
            Factory.prototype[i] = args[i];
        }
        return Factory;
    }
})();

const GameStartState = MainStateFactory({
    clickStartHandler: function () {
        console.log('開始中, 無法再次開始');
    },
    clickPauseHandler: function () {
        console.log('暫停遊戲');
    },
    clickFinishHandler: function () {
        console.log('遊戲中, 無法直接結束, 請先暫停再結束');
    }
});

const GamePauseState = MainStateFactory({
    clickStartHandler: function () {
        console.log('開始遊戲');
    },
    clickPauseHandler: function () {
        console.log('暫停中, 無法再次暫停');
    },
    clickFinishHandler: function () {
        console.log('結束遊戲');
    }
});

const GameFinishState = MainStateFactory({
    clickStartHandler: function () {
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
