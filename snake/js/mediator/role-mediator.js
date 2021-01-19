/** Mediator Pattern **/

import {noticeConfirm} from '../common/notice.js';
import {checkValueIsEmpty} from '../common/util.js';
import {checkOnlySurviveTeam} from '../common/role-util.js';

// roleMediator 負責中介管理角色相關的行為
// 例如: 食物、蛇、團隊計分、團隊勝利等等...
const roleMediator = (function () {
    let allFood = {};
    let allSnake = {};
    let allTeamScore = {};
    const operations = {};

    operations.addFood = function (food) {
        let foodType = food.foodType;
        allFood[foodType] = allFood[foodType] || [];
        allFood[foodType].push(food);
    };

    operations.addSnake = function (snake) {
        let snakeTeam = snake.snakeTeam;
        allSnake[snakeTeam] = allSnake[snakeTeam] || [];
        allSnake[snakeTeam].push(snake);
    };

    operations.getAllFood = function () {
        return allFood;
    };

    operations.getAllSnake = function () {
        return allSnake;
    };

    operations.clearAllRole = function () {
        allFood = {};
        allSnake = {};
    };

    operations.snakeEatFood = function (food, eatFoodSnakes) {
        let snakeAddBodyRate = food.getFoodBodyExpandRate();
        eatFoodSnakes.forEach((snake) => {
            snake['expandSnakeBody'](snakeAddBodyRate);
        });
    };

    operations.snakeDead = function (snake) {
        let snakeTeam = snake.snakeTeam;
        let sameTeamAllSnake = allSnake[snakeTeam];
        let isAllDead = false;

        sameTeamAllSnake.forEach((teamSnake) => {
            // 若有任何一個 team member 的死亡狀態不為 true, 表示該隊還有人活著, isAllDead 為 false
            if (!teamSnake.snakeDead) {
                isAllDead = false;
                return
            }
            // 若有全部 team member 的死亡狀態為 true, 則 isAllDead 為 true
            isAllDead = true;
        });

        if (isAllDead) {
            // operations.judgeTeamWin(snakeTeam);
        }
    }

    operations.judgeSnakeTeamWin = function (snakeTeam) {

        console.log();

        // let sameTeamAllSnake = allSnake[snakeTeam];

        // sameTeamAllSnake.forEach((teamMember) => {
        //     teamMember['snakeTeamLose']();
        // });

        noticeConfirm(`${snakeTeam} is winner!`);

        // for (let team in allSnake) {
        //     if (team !== snakeTeam) {
        //         let otherTeamSnakes = allSnake[team];
        //         otherTeamSnakes.forEach((otherSnake) => {
        //             otherSnake['snakeTeamWin']();
        //         });
        //         // noticeConfirm(`${otherTeamSnakes[0].getSnakeTeam()} is winner!`);
        //     }
        // }
    };

    operations.addSnakeTeamScore = function () {
        for (let team in allSnake) {
            let snakeTeam = allSnake[team];

            snakeTeam.forEach((snakeItem) => {
                const score = snakeItem.getSnakeScore();
                const isDead = snakeItem.getSnakeDead();
                // 如果蛇還活著而且分數是初始狀態(為空)的話, 再把初始值賦予給 allTeamScore 計算
                if (!isDead && checkValueIsEmpty(allTeamScore[team])) {
                    allTeamScore[team] = score;
                    return;
                }
                allTeamScore[team] = allTeamScore[team] + score;
                console.log(allTeamScore);
            });
        }
    }

    //處理呼叫參數的介面
    const getRoleMediatorData = function () {
        let action = Array.prototype.shift.call(arguments);
        return operations[action].apply(this);
    }

    const callRoleMediatorAction = function () {
        let action = Array.prototype.shift.call(arguments);
        operations[action].apply(this, arguments);
    }

    return {
        getRoleMediatorData: getRoleMediatorData,
        callRoleMediatorAction: callRoleMediatorAction
    };
})();

export {
    roleMediator
}
