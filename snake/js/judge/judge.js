/** Mediator Pattern **/

import {expandRuleChecker, gameOverRuleChecker} from '../checker/checker.js';

const Judge = function () {
    this.allFood = [];
    this.allSnake = [];
    // this.allSnake = {};
}

Judge.prototype.addFood = function (food) {
    this.allFood.push(food);
};

Judge.prototype.addSnake = function (snake) {
    this.allSnake.push(snake);
    // this.allSnake[snake.snakeName] = snake || {};
};

Judge.prototype.getAllFood = function () {
    return this.allFood;
};

Judge.prototype.getAllSnake = function () {
    return this.allSnake;
};

Judge.prototype.callRoleMethod = function (roleData, methodName) {
    for (let i = 0; i < roleData.length; i++) {
        roleData[i][methodName]();
    }
};

Judge.prototype.checkSnakeSelfExpand = function (allFood, allSnake) {
    const isEatFoodInfo = expandRuleChecker(allFood, allSnake);
    // 執行正確的蛇身狀態改變
    if (isEatFoodInfo.length !== 0) {
        let addBodyRate = isEatFoodInfo[0]['food'].getFoodAddBodyRate();
        isEatFoodInfo[0]['snake'].expandSnakeBody(addBodyRate);
        isEatFoodInfo[0]['food'].updateFoodPosition();
    }
    isEatFoodInfo.length = 0;
};

Judge.prototype.checkSnakeSelfGameOver = function (allSnake) {
    for (let i = 0; i < allSnake.length; i++) {
        let snakeHeadPosition = allSnake[i].getSnakeHeadPosition();
        let snakeBody = allSnake[i].getSnakeBody();
        if (gameOverRuleChecker(snakeHeadPosition, snakeBody)) {
        }
    }
};

Judge.prototype.updateGameRenderData = function () {
    let gameFoods = this.getAllFood();
    let gameSnakes = this.getAllSnake();
    this.callRoleMethod(gameSnakes, 'updateSnakePosition')
    this.checkSnakeSelfExpand(gameFoods, gameSnakes);
    this.checkSnakeSelfGameOver(gameSnakes);
};

Judge.prototype.initGameRender = function () {
    let gameSnakes = this.getAllSnake();
    this.callRoleMethod(gameSnakes, 'initListenerOperation');
};

Judge.prototype.doGameRender = function () {
    let gameFoods = this.getAllFood();
    let gameSnakes = this.getAllSnake();
    this.callRoleMethod(gameFoods, 'renderFood');
    this.callRoleMethod(gameSnakes, 'renderSnake');
};

const gameJudge = new Judge();

export {
    gameJudge
}

// const gameJudge = (function () {
//     const allFood = {};
//     const allSnake = {};
//     const operations = {};
//
//     operations.addFood = function (food) {
//         let foodType = food.foodType;
//         allFood[foodType] = allFood[foodType] || [];
//         allFood[foodType].push(food);
//     };
//     operations.addSnake = function (snake) {
//         let snakeTeam = snake.snakeTeam;
//         allSnake[snakeTeam] = allSnake[snakeTeam] || [];
//         allSnake[snakeTeam].push(snake);
//     };
//     operations.getAllFood = function () {
//         return allFood;
//     };
//     operations.getAllSnake = function () {
//         return allSnake;
//     };
//     operations.callRoleMethod = function (roleData, methodName) {
//         for (let i = 0; i < roleData.length; i++) {
//             roleData[i][methodName]();
//         }
//     };
//     operations.checkSnakeSelfExpand = function (allFood, allSnake) {
//         const isEatFoodInfo = expandRuleChecker(allFood, allSnake);
//         // 執行正確的蛇身狀態改變
//         if (isEatFoodInfo.length !== 0) {
//             let addBodyRate = isEatFoodInfo[0]['food'].getFoodAddBodyRate();
//             isEatFoodInfo[0]['snake'].expandSnakeBody(addBodyRate);
//             isEatFoodInfo[0]['food'].updateFoodPosition();
//         }
//         isEatFoodInfo.length = 0;
//     };
//     operations.checkSnakeSelfGameOver = function (allSnake) {
//         for (let i = 0; i < allSnake.length; i++) {
//             let snakeHeadPosition = allSnake[i].getSnakeHeadPosition();
//             let snakeBody = allSnake[i].getSnakeBody();
//             if (gameOverRuleChecker(snakeHeadPosition, snakeBody)) {
//             }
//         }
//     };
//     operations.initGameRender = function () {
//         let gameSnakes = this.getAllSnake();
//         this.callRoleMethod(gameSnakes, 'initListenerOperation');
//     };
//     operations.updateGameRenderData = function () {
//         let gameFoods = this.getAllFood();
//         let gameSnakes = this.getAllSnake();
//         this.callRoleMethod(gameSnakes, 'updateSnakePosition')
//         this.checkSnakeSelfExpand(gameFoods, gameSnakes);
//         this.checkSnakeSelfGameOver(gameSnakes);
//     };
//     operations.doGameRender = function () {
//         let gameFoods = this.getAllFood();
//         let gameSnakes = this.getAllSnake();
//         this.callRoleMethod(gameFoods, 'renderFood');
//         this.callRoleMethod(gameSnakes, 'renderSnake');
//     };

    // operations.playerDead = function (player) {
    //     var teamColor = player.teamColor;
    //     var teamPlayers = allPlayers[teamColor];
    //     var isAllDead = true;
    //
    //     teamPlayers.some(function (partner) {
    //         if (partner.isAlive) {
    //             isAllDead = false;
    //             return true;
    //         }
    //     });
    //     if (isAllDead) {
    //         teamPlayers.forEach(function (partner) {
    //             partner.lose();
    //         });
    //         for (var color in allPlayers) {
    //             if (color !== teamColor) {
    //                 var otherColorTeamPlayers = allPlayers[color];
    //                 otherColorTeamPlayers.forEach(function (enemy) {
    //                     enemy.win();
    //                 });
    //             }
    //         }
    //     }
    // };
    // //處理呼叫參數的介面
    // var ReceiveMessage = function () {
    //     var message = Array.prototype.shift.call(arguments);
    //     operations[message].apply(this, arguments);
    // }
    // return {
    //     ReceiveMessage: ReceiveMessage
    // };
// })();
//
// export {
//     gameJudge
// }
