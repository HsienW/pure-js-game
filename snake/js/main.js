import {initAllFood, updateAllFood, renderAllFood} from './role/food.js';
import {initAllSnake, checkAllSnakeDead, updateAllSnakePosition, renderAllSnake} from './role/snake.js';
// import {checkGlobalGameTimeFinish, globalGameTimerStart, globalGameTimerStop} from './role/timer.js';
import {map} from './role/map.js';

const snakeSpeed = 1;
let lastRenderTime = 2;

const update = () => {
    updateAllFood();
    updateAllSnakePosition();
}

const render = () => {
    map.gameMap.innerHTML = '';
    renderAllFood();
    renderAllSnake();
    checkAllSnakeDead();
}

const main = (currentTime) => {
    // if (gameOver) {
    //     // snakeA.clearSnakeBody();
    //     noticeConfirm('Is Game Over. Press ok to restart!');
    //     return;
    // }

    window.requestAnimationFrame(main);

    const secondRender = (currentTime - lastRenderTime) / 500;
    if (secondRender < 1 / snakeSpeed) {
        return;
    }

    // console.log(globalGameTimer.getTimerStopNumber() - globalGameTimer.getTimerCount());
    //

    lastRenderTime = currentTime;
    render();
    update();
}

initAllFood();
initAllSnake();
// globalGameTimer.timerStart();
window.requestAnimationFrame(main);
