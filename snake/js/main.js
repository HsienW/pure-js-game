// import {getDirection} from './operation.js';
// import {snakeSpeed, updateSnake, renderSnake, getSnakeHead, snakeBodyIntersection} from './snake.js';
// import {checkOnSnakeBody} from './common/util.js';
import {snakeA, snakeB} from './role/snake.js';
import {foodA, foodB} from './role/food.js';
import {map} from './role/map.js';
import {gameJudge} from './judge/judge.js';

const snakeList = Array.prototype.concat(...Object.values(gameJudge.getJudgeData('getAllSnake')));
const snakeSpeed = 1;
let lastRenderTime = 2;

// 取當前的蛇頭座標是否超出邊界 & 蛇頭是否撞到自己的身體
// const checkGameOver = () => {
//
//     // gameOver = snakeA.checkSnakeGameOver(snakeJudgeHandler, snakeA.getSnakeHead())
//     //     || snakeB.checkSnakeGameOver(snakeJudgeHandler, snakeB.getSnakeHead())
//
//     // gameOver = snakeA.snakeBodyIntersection(checkOnSnakeBody,{ ignoreHead: false });
// }

const update = () => {
    // gameJudge.updateGameRenderData();
    foodA.updateFoodPosition(snakeList);
    foodB.updateFoodPosition(snakeList);
    snakeA.updateSnakePosition();
    snakeB.updateSnakePosition();
    snakeA.checkSnakeDead();
    snakeB.checkSnakeDead();
    // snakeA.checkSnakeGameOver();
    // snakeB.checkSnakeGameOver();
    // console.log(snakeA.checkSelf(gameJudge));
    // snakeB.checkSelf(gameJudge);
    // checkGameOver();
}

const render = () => {
    map.gameMap.innerHTML = '';
    // gameJudge.doGameRender();
    foodA.renderFood(map.gameMap);
    foodB.renderFood(map.gameMap);
    snakeA.renderSnake(map.gameMap);
    snakeB.renderSnake(map.gameMap);
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

    lastRenderTime = currentTime;
    render();
    update();
}

// gameJudge.initGameRender();
snakeA.initListenerOperation();
snakeB.initListenerOperation();
window.requestAnimationFrame(main);
