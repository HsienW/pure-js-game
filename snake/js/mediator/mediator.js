/** Mediator Pattern **/

import {noticeConfirm} from '../common/notice.js';
import {checkValueIsEmpty} from '../common/util.js';
import {mainAnimation} from '../main/main-animation.js';

const mediator = (function () {
    let allFood = {};
    let allSnake = {};
    let allTeamScore = {};
    // let allTimer = {};
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

    // operations.addTimer = function (timer) {
    //     let timerType = timer.timerType;
    //     allTimer[timerType] = allTimer[timerType] || [];
    //     allTimer[timerType].push(timer);
    // };

    operations.getAllFood = function () {
        return allFood;
    };

    operations.getAllSnake = function () {
        return allSnake;
    };

    // operations.getAllTimer = function () {
    //     return allTimer;
    // };

    operations.clearAllRole = function () {
        allFood = {};
        allSnake = {};
        // allTimer = {};
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

        sameTeamAllSnake.forEach((teamMember) => {
            // 若有任何一個 team member 的死亡狀態不為 true, 表示該隊還有人活著, isAllDead 為 false
            if (!teamMember.snakeDead) {
                isAllDead = false;
                return
            }
            // 若有全部 team member 的死亡狀態為 true, 則 isAllDead 為 true
            isAllDead = true;
        });

        if (isAllDead) {
            operations.snakeTeamWin(snakeTeam, sameTeamAllSnake);
        }
    }

    operations.snakeTeamWin = function (snakeTeam, sameTeamAllSnake) {
        sameTeamAllSnake.forEach((teamMember) => {
            teamMember['snakeTeamLose']();
        });

        for (let team in allSnake) {
            if (team !== snakeTeam) {
                let otherTeamSnakes = allSnake[team];
                otherTeamSnakes.forEach((otherSnake) => {
                    otherSnake['snakeTeamWin']();
                });
                noticeConfirm(`${otherTeamSnakes[0].getSnakeTeam()} is winner!`);
            }
        }
    };

    operations.snakeSettleScore = function () {
        for (let team in allSnake) {
            let snakeTeam = allSnake[team];
            snakeTeam.forEach((snakeItem) => {
                const score = snakeItem.getSnakeScore();
                if (checkValueIsEmpty(allTeamScore[team])) {
                    allTeamScore[team] = score;
                    return;
                }
                allTeamScore[team] = allTeamScore[team] + score;
            });
        }

        console.log('算分算分算分算分算分算分算分');
        console.log(allTeamScore);
    }

    operations.gameFinish = function () {
        mainAnimation.doAnimationAction('isFinish');
        operations.snakeSettleScore();
    }

    //處理呼叫參數的介面
    const getJudgeData = function () {
        let action = Array.prototype.shift.call(arguments);
        return operations[action].apply(this);
    }

    const noticeJudgeAction = function () {
        let action = Array.prototype.shift.call(arguments);
        operations[action].apply(this, arguments);
    }

    return {
        getJudgeData: getJudgeData,
        noticeJudgeAction: noticeJudgeAction
    };
})();

export {
    mediator
}
