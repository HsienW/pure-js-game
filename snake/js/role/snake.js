import {aSnakeOperation, bSnakeOperation} from '../role-config/snake-operation.js';
import {checkKeydownIsExistOperation} from '../common/util.js';
import {gameOverRuleChecker} from '../checker/checker.js';
import {gameJudge} from '../judge/judge.js';
import {map} from './map.js';

const Snake = function (snakeSpeed, snakeTeam, snakeName, initBodyPosition, direction, operation, snakeStyleName) {
    this.newSnakeBody = 0;
    this.snakeWin = false;
    this.snakeDead = false;
    this.snakeSpeed = snakeSpeed;
    this.snakeTeam = snakeTeam;
    this.snakeName = snakeName;
    this.snakeBody = initBodyPosition;
    this.snakeDirection = direction;
    this.snakeOperation = operation;
    this.snakeStyleName = snakeStyleName;
    this.initListenerOperation = function () {
        window.addEventListener('keydown', event => {
            if (checkKeydownIsExistOperation(event.code, this.snakeOperation)) {
                this.snakeDirection = this.snakeOperation[event.code](this.snakeDirection);
            }
        });
    }
}

Snake.prototype.getSnakeHeadPosition = function () {
    return this.snakeBody[0];
}

Snake.prototype.getSnakeBody = function () {
    return this.snakeBody;
}

Snake.prototype.getSnakeDirection = function () {
    return this.snakeDirection;
}

Snake.prototype.snakeTeamWin = function () {
    this.snakeWin = true;
}

Snake.prototype.snakeTeamLose = function () {
    this.snakeWin = false;
}

Snake.prototype.checkSnakeDead = function () {
    let snakeHeadPosition = this.getSnakeHeadPosition();
    let snakeBody = this.getSnakeBody();
    if (gameOverRuleChecker(snakeHeadPosition, snakeBody) === 'game-over' && !this.snakeDead) {
        this.snakeDead = true;
        this.clearSnakeBody();
        // noticeConfirm(`${this.snakeName} is game over`);
        gameJudge.noticeJudgeAction('snakeDead', this);
    }
}

Snake.prototype.expandSnakeBody = function (addRate) {
    this.newSnakeBody += addRate;
}

// Snake.prototype.updateSnakeSpeed = function (speed) {
//     this.snakeSpeed += speed;
// }

Snake.prototype.clearSnakeBody = function () {
    this.snakeBody.length = 0;
}

Snake.prototype.addSnakeBody = function () {
    // 每次迴圈都會把 addRate 中最後一個 push 進 snakeBody
    for (let i = 0; i < this.newSnakeBody; i++) {
        this.snakeBody.push({...this.snakeBody[this.snakeBody.length - 1]});
    }
    this.newSnakeBody = 0;
}

Snake.prototype.updateSnakePosition = function () {
    if (!this.snakeDead) {
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
}

Snake.prototype.renderSnake = function () {
    if (!this.snakeDead) {
        this.snakeBody.forEach((bodyItem) => {
            const snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = bodyItem.y;
            snakeElement.style.gridColumnStart = bodyItem.x;
            snakeElement.classList.add(this.snakeStyleName);
            map.gameMap.appendChild(snakeElement);
        })
    }
}

const snakeFactory = function (snakeSpeed, snakeTeam, snakeName, initBodyPosition, direction, operation, snakeStyleName) {
    let newSnake = new Snake(snakeSpeed, snakeTeam, snakeName, initBodyPosition, direction, operation, snakeStyleName);
    gameJudge.noticeJudgeAction('addSnake', newSnake);
    return newSnake;
}

const snakeA = snakeFactory(1, 'aTeam', 'snakeA', [{x: 31, y: 31}], {x: 0, y: 0}, aSnakeOperation, 'a-snake-body');
const snakeB = snakeFactory(1, 'bTeam', 'snakeB', [{x: 11, y: 11}], {x: 0, y: 0}, bSnakeOperation, 'b-snake-body');

export {
    snakeA,
    snakeB
}
