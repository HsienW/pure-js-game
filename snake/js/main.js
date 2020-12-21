// import {getDirection} from './operation.js';
// import {snakeSpeed, updateSnake, renderSnake, getSnakeHead, snakeBodyIntersection} from './snake.js';
// import {checkOnSnakeBody} from './util.js';
import {snakeA, snakeB} from './role/snake.js';
import {foodA, foodB} from './role/food.js';
import {map} from './role/map.js';
import {gameJudge} from './judge/judge.js';

const foodList = [foodA, foodB];
const snakeList = [snakeA, snakeB];
let snakeSpeed = 1;
let gameOver = false;
let lastRenderTime = 2;

// const Main = function (currentRenderTime, lastRenderTime, map, foodList, snakeList) {
//     this.allGameOver = false;
//     this.currentRenderTime = currentRenderTime;
//     this.lastRenderTime = lastRenderTime;
//     this.map = map;
//     this.foodList = foodList;
//     this.snakeList = snakeList;
// }
//
// Main.prototype.initAnimationFrame = function () {
//     window.requestAnimationFrame(this.animationControl);
// }
//
// Main.prototype.initRoleListener = function () {
//     this.snakeList.forEach(snakeItem => snakeItem.initListenerOperation());
// }
//
// Main.prototype.checkGameOver = function () {
// }
//
// Main.prototype.updateRole = function () {
//     this.foodList.forEach(foodItem => foodItem.updateFood(this.snakeList));
//     this.snakeList.forEach(snakeItem => snakeItem.updateSnake());
//     this.checkGameOver();
// }
//
// Main.prototype.renderRole = function () {
//     this.map.gameMap.innerHTML = '';
//     this.foodList.forEach(foodItem => foodItem.renderFood(this.map.gameMap));
//     this.snakeList.forEach(snakeItem => snakeItem.renderSnake(this.map.gameMap));
// }
//
// Main.prototype.animationControl = function () {
//
//     console.log(this);
//
//     // if (this.allGameOver) {
//     //     if (confirm('Is Game Over. Press ok to restart!')) {}
//     //     return;
//     // }
//
//     window.requestAnimationFrame(this.animationControl);
//
//     const secondRender = (this.currentRenderTime - this.lastRenderTime) / 1000;
//     if (secondRender < 1 / Snake.prototype.snakeSpeed) {
//         return;
//     }
//
//     this.lastRenderTime = this.currentRenderTime;
//     this.renderRole();
//     this.updateRole();
// }
//
// const mainAnimationControl = new Main(1, 2, map, foodList, snakeList);
//
// mainAnimationControl.initRoleListener();
// mainAnimationControl.initAnimationFrame();






// 取當前的蛇頭座標是否超出邊界 & 蛇頭是否撞到自己的身體
const checkGameOver = () => {
    // gameOver = snakeA.checkSnakeGameOver(snakeJudgeHandler, snakeA.getSnakeHead())
    //     || snakeB.checkSnakeGameOver(snakeJudgeHandler, snakeB.getSnakeHead())

    // gameOver = outsideMap(snakeA.getSnakeHead()) || snakeA.snakeBodyIntersection(checkOnSnakeBody,{ ignoreHead: true });
}

const update = () => {
    gameJudge.updateGameRenderData();
    // foodA.updateFoodPosition(snakeList);
    // foodB.updateFoodPosition(snakeList);
    // snakeA.updateSnakePosition();
    // snakeB.updateSnakePosition();
    // snakeA.checkSnakeGameOver();
    // snakeB.checkSnakeGameOver();
    // console.log(snakeA.checkSelf(gameJudge));
    // snakeB.checkSelf(gameJudge);
    // checkGameOver();
}

const render = () => {
    map.gameMap.innerHTML = '';
    gameJudge.doGameRender();
    // foodA.renderFood(map.gameMap);
    // foodB.renderFood(map.gameMap);
    // snakeA.renderSnake(map.gameMap);
    // snakeB.renderSnake(map.gameMap);
}

const main = (currentTime) => {
    // if (gameOver) {
    //     snakeA.clearSnakeBody();
    //     if (confirm('Is Game Over. Press ok to restart!')) {}
    //     return;
    // }

    window.requestAnimationFrame(main);

    const secondRender = (currentTime - lastRenderTime) / 1000;
    if (secondRender < 1 / snakeSpeed) {
        return;
    }

    lastRenderTime = currentTime;
    render();
    update();
}

gameJudge.initGameRender();
// snakeA.initListenerOperation();
// snakeB.initListenerOperation();
window.requestAnimationFrame(main);
