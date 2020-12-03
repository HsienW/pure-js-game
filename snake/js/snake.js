import {getDirection} from './operation.js';
import {checkOnSnakeBody} from './util.js';

let newSnakeBody = 0;
const snakeSpeed = 1;
const snakeBody = [{x: 11, y: 11}];

const getSnakeHead = () => {
    return snakeBody[0];
}

const snakeBodyIntersection = () => {
    return checkOnSnakeBody(snakeBody[0], { ignoreHead: true });
}

const expandSnakeBody = (addRate) => {
    newSnakeBody += addRate;
}

const addSnakeBody = () => {
    // 每次迴圈都會把 addRate 中最後一個 push 進 snakeBody
    for (let i = 0; i < newSnakeBody; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1]});
    }
    newSnakeBody = 0;
}

const updateSnake = () => {
    addSnakeBody();
    // 取得蛇頭位子的 x y 座標
    const currentDirection = getDirection();

    // 因為蛇頭會往前移一格, 所以身體也要跟著移一格
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        // 將本來的 i 位子的身體賦予給 i+1, 達成往前移一格
        // 若以蛇頭來當例子, 相當於從 [0] 變成 [-1], 以此類推 (蛇頭不列入計算)
        snakeBody[i + 1] = {...snakeBody[i]};
    }

    // 將新方向的 x y 座標賦予給蛇頭
    snakeBody[0].x += currentDirection.x;
    snakeBody[0].y += currentDirection.y;
}

const renderSnake = (map) => {
    snakeBody.forEach((bodyItem) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = bodyItem.y;
        snakeElement.style.gridColumnStart = bodyItem.x;
        snakeElement.classList.add('snake');
        map.appendChild(snakeElement);
    })
}

export {
    snakeSpeed,
    snakeBody,
    getSnakeHead,
    snakeBodyIntersection,
    expandSnakeBody,
    updateSnake,
    renderSnake
}
