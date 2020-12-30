/** Strategy Pattern **/

/** Expand Body Food **/
// 0 = general expand food (增加蛇身體 1格)
// 1 = mega expand food (增加蛇身體 2格)

/** Speed Food **/
// 2 = double fast food (蛇基礎移動速度為 0.5 秒一次 - 持續10秒)
// 3 = treble fast food (增加蛇移動速度為 0.25 秒一次 - 持續10秒)

const foodTypeInfo = {
    0: function (baseExpandRate, baseSpeed) {
        return {
            type: 'general-expand',
            expandRate: baseExpandRate * 1,
            speedRate: baseSpeed * 1
        };
    },
    1: function (baseExpandRate, baseSpeed) {
        return {
            type: 'mega-expand',
            expandRate: baseExpandRate * 2,
            speedRate: baseSpeed * 1
        };
    },
    2: function (baseExpandRate, baseSpeed) {
        return {
            type: 'double-fast',
            expandRate: baseExpandRate * 0,
            speedRate: baseSpeed * 0.5
        };
    },
    3: function (baseExpandRate, baseSpeed) {
        return {
            type: 'treble-fast',
            expandRate: baseExpandRate * 0,
            speedRate: baseSpeed * 0.25
        };
    }

}

export {
    foodTypeInfo,
}

