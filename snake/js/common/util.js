import {mapSize} from '../role/map.js';

// 亂數隨機產生在 mapSize * mapSize 範圍內的一組 x y 座標
const getRandomPosition = () => {
    return {
        x: Math.floor(Math.random() * mapSize) + 1,
        y: Math.floor(Math.random() * mapSize) + 1
    }
}

const checkEqualPositions = (positionA, positionB) => {
    return positionA.x === positionB.x && positionA.y === positionB.y
}

const checkFoodOnSnakeBody = (allFood, allSnake) => {
// 回傳吃到的蛇跟那顆食物
    return allSnake.filter((snakeItem) => {
        return allFood.some((foodItem) => {
            if (checkEqualPositions(snakeItem, foodItem)) {
                return {
                    snake: snakeItem,
                    food: foodItem
                }
            }
        });
    });
}

// this.snakeBody[0], this.snakeBody, ignoreHead
// ignoreHead 用來忽略 bodyData 中拿到自己蛇頭的卡控
const checkOnSnakeBody = (position, allSnake, {ignoreHead = false} = {}) => {
    return allSnake.filter((snakeItem) => {
        return snakeItem.snakeBody.some((snakeBodyItem, index) => {
            if (ignoreHead && index === 0) return false
            return checkEqualPositions(snakeBodyItem, position);
        })
    });
}

const checkKeydownIsExistOperation = (keydownEventCode, operationObject) => {
    return Object.keys(operationObject).some((operationItem) => {
        return operationItem === keydownEventCode;
    });
}

export {
    getRandomPosition,
    checkEqualPositions,
    checkOnSnakeBody,
    checkFoodOnSnakeBody,
    checkKeydownIsExistOperation
}
