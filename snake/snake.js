let lastRenderTime = 0;
const snakeSpeed = 1;
const snakeBody = [{ x: 11, y: 11 }];
const gameMap = document.querySelector('.game-map')

const renderSnake = (map) => {
    snakeBody.forEach((bodyItem) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = bodyItem.y;
        snakeElement.style.gridColumnStart = bodyItem.x;
        snakeElement.classList.add('snake');
        map.appendChild(snakeElement);
    })
}

const main = (currentTime) => {
    window.requestAnimationFrame(main);

    const secondRender = (currentTime - lastRenderTime) / 1000;
    if (secondRender < 1 / snakeSpeed) {
        return;
    }

    lastRenderTime = currentTime;
    renderSnake(gameMap);
}

window.requestAnimationFrame(main);
