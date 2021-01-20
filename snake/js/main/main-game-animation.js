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
        roleMediator.callRoleMediatorAction('updateAllFood');
        roleMediator.callRoleMediatorAction('updateAllSnakePosition');
    }

    operations.renderRole = function () {
        map.renderMap();
        roleMediator.callRoleMediatorAction('renderAllFood');
        roleMediator.callRoleMediatorAction('renderAllSnake');
    }

    // 檢查場上每個 role item 的狀態
    // 例如: 每隻蛇是否死亡
    operations.checkRoleItemState = function () {
        roleMediator.callRoleMediatorAction('checkAllSnakeDead');
    }

    // 檢查場上每個 team 的狀態
    // 例如: 是否有 team 時間到之前就中途獲勝
    operations.checkRoleTeamState = function () {
        const allSnake = roleMediator.getRoleMediatorData('getAllSnake');
        const halfwayWinTeam = halfwayFinishRuleChecker(allSnake); // 時間還沒到, 但中途獲勝的團隊

        if (halfwayWinTeam) {
            const winTeamName = halfwayWinTeam[0][0].snakeTeam;
            mainGameMediator.callMainGameMediatorAction('gameFinish');
            roleMediator.callRoleMediatorAction('judgeSnakeTeamWin', winTeamName);
        }
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
        operations.checkRoleItemState();
        operations.checkRoleTeamState();
        // after(operations.render, operations.checkData);
    }

    operations.isInit = function () {
        roleMediator.callRoleMediatorAction('initAllFood');
        roleMediator.callRoleMediatorAction('initAllSnake');
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

