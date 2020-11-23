import {updateFood, renderFood} from './food.js';
import {gameMap, snakeSpeed, updateSnake, renderSnake} from './snake.js';

let lastRenderTime = 0;

const draw = () => {
    gameMap.innerHTML = '';
    renderSnake(gameMap);
    renderFood(gameMap);
}

const update = () => {
    updateFood();
    updateSnake();
}

const main = (currentTime) => {
    window.requestAnimationFrame(main);

    const secondRender = (currentTime - lastRenderTime) / 1000;
    if (secondRender < 1 / snakeSpeed) {
        return;
    }

    lastRenderTime = currentTime;
    draw()
    update();
}

window.requestAnimationFrame(main);
