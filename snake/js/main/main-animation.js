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
        renderAllSnake()
        checkAllSnakeDead();
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
        operations.render();
        operations.update();
    }

    operations.isInit = function () {
        initAllFood();
        initAllSnake();
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

