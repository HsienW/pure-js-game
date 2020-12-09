// 亂數隨機產生在 mapSize * mapSize 範圍內的一組 x y 座標
import {map} from './map.js';

const mapSize = map.getMapSize();

const getRandomPosition = () => {
    return {
        x: Math.floor(Math.random() * mapSize) + 1,
        y: Math.floor(Math.random() * mapSize) + 1
    }
}

const checkOutsideMap = (position) => {
    return (position.x < 1 || position.x > mapSize || position.y < 1 || position.y > mapSize);
}

const checkEqualPositions = (positionA, positionB) => {
    return positionA.x === positionB.x && positionA.y === positionB.y
}

// ignoreHead 用來忽略 bodyData 中拿到自己蛇頭的卡控
const checkOnSnakeBody = (position, snakeList, {ignoreHead = false} = {}) => {
    return snakeList.filter((snakeItem) => {
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
    checkOutsideMap,
    checkEqualPositions,
    checkOnSnakeBody,
    checkKeydownIsExistOperation
}
