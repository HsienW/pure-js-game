// import {getDirection} from './operation.js';
// import {snakeSpeed, updateSnake, renderSnake, getSnakeHead, snakeBodyIntersection} from './snake.js';
// import {checkOnSnakeBody} from './util.js';
import {snakeA, snakeB} from './snake.js';
import {foodA, foodB} from './food.js';
import {gameMap, outsideMap} from './map.js';

let gameOver = false;
let lastRenderTime = 2;

// 取當前的蛇頭座標是否超出邊界 & 蛇頭是否撞到自己的身體
// const checkGameOver = () => {
//     gameOver = outsideMap(snakeA.getSnakeHead()) || snakeA.snakeBodyIntersection(checkOnSnakeBody,{ ignoreHead: true });
// }

const snakeList = [snakeA, snakeB];

const render = () => {
    gameMap.innerHTML = '';
    snakeA.renderSnake(gameMap, 'a-snake-body');
    snakeB.renderSnake(gameMap, 'b-snake-body');
    foodA.renderFood(gameMap);
    foodB.renderFood(gameMap);
}

const update = () => {
    snakeA.updateSnake();
    snakeB.updateSnake();
    foodA.updateFood(snakeList);
    foodB.updateFood(snakeList);
    // checkGameOver();
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
