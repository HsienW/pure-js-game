import {initAllFood, updateAllFood, renderAllFood} from '../role/food.js';
import {initAllSnake, checkAllSnakeDead, updateAllSnakePosition, renderAllSnake} from '../role/snake.js';
import {map} from '../role/map.js';

let snakeSpeed = 1;
let lastRenderTime = 2;

// const update = function () {
//     updateAllFood();
//     updateAllSnakePosition();
// }
//
// const render = function () {
//     map.gameMap.innerHTML = '';
//     renderAllFood();
//     renderAllSnake();
//     checkAllSnakeDead();
// }

// const mainAnimation = function (currentTime) {
//     window.requestAnimationFrame(mainAnimation);
//     const secondRender = (currentTime - lastRenderTime) / 500;
//     if (secondRender < 1 / snakeSpeed) {
//         return;
//     }
//
//     lastRenderTime = currentTime;
//     render();
//     update();
// }

// const isMainStart = function () {
//     initAllFood();
//     initAllSnake();
//     window.requestAnimationFrame(mainAnimation);
// }


const mainAnimation = (function () {
    const operations = {};

    operations.update = function () {
        updateAllFood();
        updateAllSnakePosition();
    }

    operations.render = function () {
        map.gameMap.innerHTML = '';
        renderAllFood();
        renderAllSnake();
        checkAllSnakeDead();
    }

    operations.doAnimation = function (currentTime) {
        window.requestAnimationFrame(operations.doAnimation);
        const secondRender = (currentTime - lastRenderTime) / 500;
        if (secondRender < 1 / snakeSpeed) {
            return;
        }

        lastRenderTime = currentTime;
        operations.render();
        operations.update();
    }

    operations.isStart = function () {
        initAllFood();
        initAllSnake();
        window.requestAnimationFrame(operations.doAnimation);
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

