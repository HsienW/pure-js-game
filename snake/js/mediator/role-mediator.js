/** Mediator Pattern **/

// import {noticeConfirm} from '../common/notice.js';
import {initFoods} from '../role/food.js';
import {initSnakes} from '../role/snake.js';
import {checkValueIsEmpty} from '../common/util.js';
// import {checkOnlySurviveTeam} from '../common/role-util.js';

// roleMediator 負責中介管理角色相關的行為
// 例如: 食物、蛇、團隊計分、團隊勝利等等...
const roleMediator = (function () {
    let allFood = {};
    let allSnake = {};
    let allSnakeTeamScore = {};
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
            // 增加的身體長度等於拿到的分數
            operations.addSnakeTeamScore(snake, snakeAddBodyRate);
        });
    };

    operations.initAllFood = function () {
        initFoods();
    }

    operations.updateAllFood = function () {
        callRoleItemMethod(allFood, 'updateFoodItem');
    }

    operations.renderAllFood = function () {
        callRoleItemMethod(allFood, 'renderFoodItem');
    }

    operations.initAllSnake = function () {
        initSnakes();
        callRoleItemMethod(allSnake, 'initListenerOperation');
    }

    operations.checkAllSnakeDead = function () {
        callRoleItemMethod(allSnake, 'checkSnakeItemDead');
    }

    operations.updateAllSnakePosition = function () {
        callRoleItemMethod(allSnake, 'updateSnakeItemPosition');
    }

    operations.renderAllSnake = function () {
        callRoleItemMethod(allSnake, 'renderSnakeItem');
    }


    operations.judgeSnakeTeamWin = function (snakeTeam) {

        console.log();

        // let sameTeamAllSnake = allSnake[snakeTeam];

        // sameTeamAllSnake.forEach((teamMember) => {
        //     teamMember['snakeTeamLose']();
        // });

        // noticeConfirm(`${snakeTeam} is winner!`);

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

    operations.addSnakeTeamScore = function (snake, score) {
        const snakeTeam = snake.getSnakeTeam();
        const isDead = snake.getSnakeDead();

        if (!isDead && checkValueIsEmpty(allSnakeTeamScore[snakeTeam])) {
            allSnakeTeamScore[snakeTeam] = score;
            return;
        }
        allSnakeTeamScore[snakeTeam] = allSnakeTeamScore[snakeTeam] + score;
        console.log(allSnakeTeamScore);
    }

    //處理某種角色, 全部的 item 需要一起呼叫的
    const callRoleItemMethod = function (role, methodName) {
        for (let key in role) {
            let items = role[key];
            items.forEach((item) => {
                item[methodName]();
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
