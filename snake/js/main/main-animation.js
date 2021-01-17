import {initFoods, updateFoods, renderFoods} from '../role/food.js';
import {initSnakes, checkSnakesDead, updateSnakesPosition, renderSnakes} from '../role/snake.js';
import {after} from '../decorator/decorator.js';
import {gameOverRuleChecker} from '../checker/checker.js';
import {map} from '../role/map.js';
import {mediator} from "../mediator/mediator";

const mainAnimation = (function () {
    let activation = null;
    let snakeSpeed = 1;
    let lastRenderTime = 2;
    const operations = {};

    operations.updateData = function () {
        updateFoods();
        updateSnakesPosition();
    }

    operations.render = function () {
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
        operations.updateData();
        // operations.render();
        after(operations.render, checkData);
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

    const checkData = function () {
        checkSnakesDead();
        if(gameOverRuleChecker() === 'game-over') {
            operations.isFinish();
            mediator.noticeJudgeAction('snakeSettleScore');
        }
    }

    const doAnimationAction = function (action) {
        return operations[action].apply(this);
    }

    return {
        doAnimationAction: doAnimationAction
    }

})()

export {
    mainAnimation,
}

