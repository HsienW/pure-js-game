// import {getDirection} from './operation.js';
// import {snakeSpeed, updateSnake, renderSnake, getSnakeHead, snakeBodyIntersection} from './snake.js';
// import {checkOnSnakeBody} from './util.js';
import {snakeA, snakeB} from './snake.js';
import {foodA, foodB} from './food.js';
import {map} from './map.js';
import {snakeJudgeHandler} from './judge/judge.js';

let gameOver = false;
let lastRenderTime = 2;

// 取當前的蛇頭座標是否超出邊界 & 蛇頭是否撞到自己的身體
const checkGameOver = () => {
    gameOver = snakeJudgeHandler(snakeA.getSnakeHead()) || snakeJudgeHandler(snakeB.getSnakeHead());
    // gameOver = outsideMap(snakeA.getSnakeHead()) || snakeA.snakeBodyIntersection(checkOnSnakeBody,{ ignoreHead: true });
}

const snakeList = [snakeA, snakeB];

const render = () => {
    map.gameMap.innerHTML = '';
    foodA.renderFood(map.gameMap);
    foodB.renderFood(map.gameMap);
    snakeA.renderSnake(map.gameMap, 'a-snake-body');
    snakeB.renderSnake(map.gameMap, 'b-snake-body');
}

const update = () => {
    foodA.updateFood(snakeList);
    foodB.updateFood(snakeList);
    snakeA.updateSnake();
    snakeB.updateSnake();
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
    render()
    update();
}

snakeA.initListenerOperation();
snakeB.initListenerOperation();
window.requestAnimationFrame(main);
