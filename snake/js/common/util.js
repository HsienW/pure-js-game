import {mapSize} from '../role/map.js';

// 亂數隨機產生在 mapSize * mapSize 範圍內的一組 x y 座標
const getRandomPosition = () => {
    return {
        x: Math.floor(Math.random() * mapSize) + 1,
        y: Math.floor(Math.random() * mapSize) + 1
    }
}

const getRandomFoodAmount = (max) => {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

const getRandomFoodType = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const checkValueIsEmpty = (value) => {
    if (value === null || value === undefined || value.length === 0 || Object.keys(value).length === 0) {
        return true;
    }
    return false;
}

const checkEqualPositions = (positionA, positionB) => {
    if (!checkValueIsEmpty(positionA) && !checkValueIsEmpty(positionB)) {
        return positionA.x === positionB.x && positionA.y === positionB.y
    }
    return null;
}

const checkPositionOutsideMap = (position) => {
    if (!checkValueIsEmpty(position)) {
        return (position.x < 1 || position.x > mapSize || position.y < 1 || position.y > mapSize);
    }
    return null;
}

// ignoreHead 用來忽略 bodyData 中拿到自己蛇頭的卡控
const checkPositionOnSnakeBody = (position, snakeBody) => {
    // 回傳撞到自己的蛇
    if (!checkValueIsEmpty(snakeBody)) {
        return snakeBody.some((bodyItem, index) => {
            if (index === 0) return false
            return checkEqualPositions(position, bodyItem)
        })
    }
    return null;
}

const checkFoodOnSnakeBody = (food, allSnake) => {
    // 回傳吃到的蛇跟那顆食物
    let result = [];
    if (!checkValueIsEmpty(allSnake)) {
        for (let snakeTeam in allSnake) {
            let snakes = allSnake[snakeTeam];
            snakes.forEach((snakeItem) => {
                let snakeItemHeadPosition = snakeItem.getSnakeHeadPosition();
                let foodPosition = food.getFoodPosition();
                if (checkEqualPositions(foodPosition, snakeItemHeadPosition)) {
                    result.push(snakeItem);
                }
            });
        }
        return result;
    }
    return null;
}

const checkKeydownIsExistOperation = (keydownEventCode, operationObject) => {
    return Object.keys(operationObject).some((operationItem) => {
        return operationItem === keydownEventCode;
    });
}

const checkOnlySurviveTeam = (allSnake) => {
    // 回傳剩下唯一有人存活的 Snake Team
    let result = [];
    if (!checkValueIsEmpty(allSnake)) {
        for (let snakeTeam in allSnake) {
            let snakes = allSnake[snakeTeam];
            if (snakes.some(snakeItem => snakeItem.snakeDead === false)) {
                result.push(snakes);
            }
        }
        if (result.length === 1) {
            return result;
        }
        return false;
    }
    return null;
}


export {
    getRandomPosition,
    getRandomFoodAmount,
    getRandomFoodType,
    checkValueIsEmpty,
    checkEqualPositions,
    checkPositionOutsideMap,
    checkPositionOnSnakeBody,
    // checkOnSnakeBody,
    checkFoodOnSnakeBody,
    checkKeydownIsExistOperation,
    checkOnlySurviveTeam
}
