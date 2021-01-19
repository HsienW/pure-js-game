import {initFoods, updateFoods, renderFoods} from '../role/food.js';
import {initSnakes, checkSnakesDead, updateSnakesPosition, renderSnakes} from '../role/snake.js';
// import {after} from '../decorator/decorator.js';
import {halfwayFinishRuleChecker} from '../checker/checker.js';
import {map} from '../role/map.js';
import {mainGameMediator} from '../mediator/main-game-mediator.js';
import {roleMediator} from '../mediator/role-mediator.js';

const mainGameAnimation = (function () {
    let activation = null;
    let snakeSpeed = 1;
    let lastRenderTime = 2;
    const operations = {};

    operations.updateRoleData = function () {
        updateFoods();
        updateSnakesPosition();
    }

    operations.renderRole = function () {
        map.renderMap();
        renderFoods();
        renderSnakes();
    }

    operations.doAnimation = function (currentTime) {
        operations.isStart();

        // 若要開啟 speed 食物, 要固定基本更新秒數 除以 1000(毫秒)
        const secondRender = (currentTime - lastRenderTime) / 100;

        // 若要開啟 speed 食物, 這邊不能擋
        if (secondRender < 1 / snakeSpeed) {
            return;
        }

        lastRenderTime = currentTime;
        operations.updateRoleData();
        operations.renderRole();
        operations.checkRoleState();
        // after(operations.render, operations.checkData);
    }

    operations.isInit = function () {
        initFoods();
        initSnakes();
    }

    operations.isStart = function () {
        activation = requestAnimationFrame(operations.doAnimation);
    }

    operations.isPause = function () {
        cancelAnimationFrame(activation);
    }

    operations.isFinish = function () {
        cancelAnimationFrame(activation);
    }

    operations.checkRoleState = function () {
        // 檢查場上每個單一蛇的存活狀態
        checkSnakesDead();

        // 檢查場上每隊的存活狀態
        const allSnake = roleMediator.getRoleMediatorData('getAllSnake');
        const halfwayWinTeam = halfwayFinishRuleChecker(allSnake); // 時間還沒到, 但中途獲勝的團隊

        if (halfwayWinTeam) {
            const winTeamName = halfwayWinTeam[0][0].snakeTeam;
            mainGameMediator.callMainGameMediatorAction('gameFinish');
            roleMediator.callRoleMediatorAction('judgeSnakeTeamWin', winTeamName);
        }
    }

    const animationAction = function (action) {
        return operations[action].apply(this);
    }

    return {
        animationAction: animationAction
    }

})()

export {
    mainGameAnimation,
}

