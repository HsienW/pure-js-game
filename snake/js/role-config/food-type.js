/** Strategy Pattern **/

/** Expand Body Food **/
// 0 = general food (增加蛇身體 1格)
// 1 = mega food (增加蛇身體 2格)

/** Speed Food **/
// 0 = double fast food (蛇基礎移動速度為 0.5 秒一次 - 持續10秒)
// 1 = treble fast food (增加蛇移動速度為 0.25 秒一次 - 持續10秒)

const expandBodyFoodTypeInfo = {
    0: function (baseExpandRate) {
        return {
            type: 'general',
            expandRate: baseExpandRate * 1
        };
    },
    1: function (baseExpandRate) {
        return {
            type: 'mega',
            expandRate: baseExpandRate * 2
        };
    }
}

const speedFoodTypeInfo = {
    0: function (baseSpeed) {
        return baseSpeed * 0.5;
    },
    1: function (baseSpeed) {
        return baseSpeed * 0.25;
    }
}

export {
    expandBodyFoodTypeInfo,
    speedFoodTypeInfo
}

