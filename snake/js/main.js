// import {getDirection} from './operation.js';
// import {snakeSpeed, updateSnake, renderSnake, getSnakeHead, snakeBodyIntersection} from './snake.js';

import {food} from './food.js';
import {snakeA, snakeB} from './snake.js';
import {gameMap, outsideMap} from './map.js';
import {checkOnSnakeBody} from './util.js';
import {aGamerOperation} from './operation.js';

let gameOver = false;
let lastRenderTime = 2;

// 取當前的蛇頭座標是否超出邊界 & 蛇頭是否撞到自己的身體
const checkGameOver = () => {
    gameOver = outsideMap(snakeA.getSnakeHead()) || snakeA.snakeBodyIntersection(checkOnSnakeBody,{ ignoreHead: true });
}

const draw = () => {
    gameMap.innerHTML = '';
    snakeA.renderSnake(gameMap, 'snake-gamer-a');
    // snakeB.renderSnake(gameMap, 'snake-gamer-b');
    food.renderFood(gameMap);
}

const update = () => {
    food.updateFood(snakeA);
    snakeA.updateSnake();
    // snakeB.updateSnake();
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

snakeA.initListenerOperation();
// snakeA.setGamerOperation(aGamerOperation);
// snakeB.initListenerOperation();

window.requestAnimationFrame(main);
