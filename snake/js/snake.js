import {getDirection} from './operation.js';

let newSnakeBody = 0;
export const snakeSpeed = 1;
export const snakeBody = [{x: 11, y: 11}];
export const gameMap = document.getElementById('game-map')

export const expandSnakeBody = (addRate) => {
    newSnakeBody += addRate;
};

const addSnakeBody = () => {
    for (let i = 0; i < newSnakeBody; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1]});
    }
    newSnakeBody = 0;
}

export const updateSnake = () => {
    addSnakeBody();

    const currentDirection = getDirection();
    // for (let i = snakeBody.length - 2; i >= 0; i--) {
    //     snakeBody[i + 1] = {...snakeBody[i]};
    // }
    snakeBody[0].x += currentDirection.x;
    snakeBody[0].y += currentDirection.y;
}

export const renderSnake = (map) => {
    snakeBody.forEach((bodyItem) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = bodyItem.y;
        snakeElement.style.gridColumnStart = bodyItem.x;
        snakeElement.classList.add('snake');
        map.appendChild(snakeElement);
    })
}
