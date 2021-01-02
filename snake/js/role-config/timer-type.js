/** Strategy Pattern **/

/** Game Timer **/
// speed play (快速模式) = 遊戲倒數 60 秒為 1 局
// normal play (正常模式) = 遊戲倒數 120 秒為 1 局
// slowness play (慢速模式) = 遊戲倒數 180 秒為 1 局

const gameTimerTypeInfo = {
    speedPlay: function () {
        return {
            timerType: 'global-game-time',
            timerStopNumber: 60000
        }
    },
    normalPlay: function () {
        return {
            timerType: 'global-game-time',
            timerStopNumber: 5
        }
    },
    slownessPlay: function () {
        return {
            timerType: 'global-game-time',
            timerStopNumber: 180000
        }
    }
}

export {
    gameTimerTypeInfo
}
