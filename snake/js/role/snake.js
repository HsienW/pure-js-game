import {aSnakeOperation, bSnakeOperation} from '../behavior/operation.js';
import {checkKeydownIsExistOperation} from '../common/util.js';

const Snake = function (initBodyPosition, direction, operation, snakeStyleName) {
    this.newSnakeBody = 0;
    this.snakeGameOver = false;
    this.snakeBody = initBodyPosition;
    this.snakeDirection = direction;
    this.snakeOperation = operation;
    this.snakeStyleName = snakeStyleName;
    this.initListenerOperation = function () {
        window.addEventListener('keydown', event => {
            if(checkKeydownIsExistOperation(event.code, this.snakeOperation)) {
                this.snakeDirection = this.snakeOperation[event.code](this.snakeDirection);
            }
        });
    }
}

Snake.prototype.snakeSpeed = 1;

Snake.prototype.checkSnakeGameOver = function (judgeHandler, judgeCondition) {
    return judgeHandler(judgeCondition);
}

Snake.prototype.getSnakeHead = function () {
    return this.snakeBody[0];
}

Snake.prototype.getSnakeDirection = function () {
    return this.snakeDirection;
}

// Snake.prototype.snakeBodyIntersection = function (checkOnSnakeBody, ignoreHead) {
//     return checkOnSnakeBody(this.snakeBody[0], this.snakeBody, ignoreHead);
// }

Snake.prototype.expandSnakeBody = function (addRate) {
    this.newSnakeBody += addRate;
}

Snake.prototype.addSnakeBody = function () {
    // 每次迴圈都會把 addRate 中最後一個 push 進 snakeBody
    for (let i = 0; i < this.newSnakeBody; i++) {
        this.snakeBody.push({...this.snakeBody[this.snakeBody.length - 1]});
    }
    this.newSnakeBody = 0;
}

Snake.prototype.clearSnakeBody = function () {
    this.snakeBody = [{x: -1, y: -1}];
}

Snake.prototype.updateSnake = function () {
    this.addSnakeBody();
    // 取得蛇頭位子的 x y 座標
    const currentDirection = this.getSnakeDirection();

    // 因為蛇頭會往前移一格, 所以身體也要跟著移一格
    for (let i = this.snakeBody.length - 2; i >= 0; i--) {
        // 將本來的 i 位子的身體賦予給 i+1, 達成往前移一格
        // 若以蛇頭來當例子, 相當於從 [0] 變成 [-1], 以此類推 (蛇頭不列入計算)
        this.snakeBody[i + 1] = {...this.snakeBody[i]};
    }

    // 將新方向的 x y 座標賦予給蛇頭
    this.snakeBody[0].x += currentDirection.x;
    this.snakeBody[0].y += currentDirection.y;
}

Snake.prototype.renderSnake = function (map) {
    this.snakeBody.forEach((bodyItem) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = bodyItem.y;
        snakeElement.style.gridColumnStart = bodyItem.x;
        snakeElement.classList.add(this.snakeStyleName);
        map.appendChild(snakeElement);
    })
}

const snakeA = new Snake([{x: 31, y: 31}], {x: 0, y: 0}, aSnakeOperation, 'a-snake-body');
const snakeB = new Snake([{x: 11, y: 11}], {x: 0, y: 0}, bSnakeOperation, 'b-snake-body');

export {
    Snake,
    snakeA,
    snakeB
}
