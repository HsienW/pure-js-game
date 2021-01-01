/** Strategy Pattern **/

/** Game Timer **/
// speed play (快速模式) = 遊戲倒數 60 秒為 1 局
// normal play (正常模式) = 遊戲倒數 120 秒為 1 局
// slowness play (慢速模式) = 遊戲倒數 180 秒為 1 局

const gameTimerTypeInfo = {
    speedPlay: function (timerId) {
        return {
            timerId: timerId,
            gameTime: 60
        }
    },
    normalPlay: function (timerId) {
        return {
            timerId: timerId,
            gameTime: 120
        }
    },
    slownessPlay: function (timerId) {
        return {
            timerId: timerId,
            gameTime: 180
        }
    }
}

export {
    gameTimerTypeInfo
}
