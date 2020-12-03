import {updateFood, renderFood} from './food.js';
import {snakeA, snakeB} from './snake.js';
// import {snakeSpeed, updateSnake, renderSnake, getSnakeHead, snakeBodyIntersection} from './snake.js';
import {gameMap, outsideMap} from './map.js';
import {getDirection} from './operation.js';
import {checkOnSnakeBody} from './util.js';

let gameOver = false;
let lastRenderTime = 2;

// 取當前的蛇頭座標是否超出邊界 & 蛇頭是否撞到自己的身體
const checkGameOver = () => {
    gameOver = outsideMap(snakeA.getSnakeHead()) || snakeA.snakeBodyIntersection(checkOnSnakeBody,{ ignoreHead: true });
}

const draw = () => {
    gameMap.innerHTML = '';
    snakeA.renderSnake(gameMap, 'snake-gamer-a');
    snakeB.renderSnake(gameMap, 'snake-gamer-b');
    renderFood(gameMap);
}

const update = () => {
    updateFood();
    snakeA.updateSnake(getDirection);
    snakeB.updateSnake(getDirection);
    checkGameOver();
}

const main = (currentTime) => {

    if (gameOver) {
        if (confirm('Is Game Over. Press ok to restart!')) {}
        return;
    }

    window.requestAnimationFrame(main);

    const secondRender = (currentTime - lastRenderTime) / 1000;
    if (secondRender < 1 / snakeA.snakeSpeed) {
        return;
    }

    lastRenderTime = currentTime;
    draw()
    update();
}

window.requestAnimationFrame(main);
