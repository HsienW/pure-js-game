import {initAllFood, updateAllFood, renderAllFood} from '../role/food.js';
import {initAllSnake, checkAllSnakeDead, updateAllSnakePosition, renderAllSnake} from '../role/snake.js';
import {map} from '../role/map.js';

const mainAnimation = (function () {
    let activation = null;
    let snakeSpeed = 1;
    let lastRenderTime = 2;
    const operations = {};

    operations.update = function () {
        updateAllFood();
        updateAllSnakePosition();
    }

    operations.render = function () {
        map.renderMap();
        renderAllFood();
        renderAllSnake();
        checkAllSnakeDead();
    }

    operations.doAnimation = function (currentTime) {
        operations.isStart();
        const secondRender = (currentTime - lastRenderTime) / 250;

        if (secondRender < 1 / snakeSpeed) {
            return;
        }

        lastRenderTime = currentTime;
        operations.render();
        operations.update();
    }

    operations.isInit = function () {
        initAllFood();
        initAllSnake();
    }

    operations.isStart = function () {
        activation = window.requestAnimationFrame(operations.doAnimation);
    }

    operations.isPause = function () {
        window.cancelAnimationFrame(activation);
    }

    operations.isFinish = function () {
        window.cancelAnimationFrame(activation);
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

