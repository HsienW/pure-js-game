import {updateFood, renderFood} from './food.js';
import {gameMap, snakeSpeed, updateSnake, renderSnake, getSnakeHead, snakeBodyIntersection} from './snake.js';
import {outsideMap} from './map.js';

let gameOver = false;
let lastRenderTime = 2;

// 取當前的蛇頭座標是否超出邊界 & 蛇頭是否撞到自己的身體
const checkGameOver = () => {
    gameOver = outsideMap(getSnakeHead()) || snakeBodyIntersection();
}

const draw = () => {
    gameMap.innerHTML = '';
    renderSnake(gameMap);
    renderFood(gameMap);
}

const update = () => {
    updateFood();
    updateSnake();
    checkGameOver();
}

const main = (currentTime) => {

    if (gameOver) {
        if (confirm('Is Game Over. Press ok to restart!')) {}
        return;
    }

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
