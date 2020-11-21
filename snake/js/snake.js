import {renderFood, updateFood} from './food.js';

let lastRenderTime = 0;
let newSnakeBody = 0;

export const snakeSpeed = 1;
export const snakeBody = [{x: 11, y: 11}];
export const gameMap = document.getElementById('game-map')

export const addSnakeBody = (addRate) => {
    newSnakeBody += addRate
};

const renderSnake = (map) => {
    snakeBody.forEach((bodyItem) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = bodyItem.y;
        snakeElement.style.gridColumnStart = bodyItem.x;
        snakeElement.classList.add('snake');
        map.appendChild(snakeElement);
    })
}

const draw = () => {
    gameMap.innerHTML = '';
    renderSnake(gameMap);
    renderFood(gameMap);
}

const update = () => {
    updateFood();
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
