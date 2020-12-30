import {mapSize} from '../role/map.js';

// 亂數隨機產生在 mapSize * mapSize 範圍內的一組 x y 座標
const getRandomPosition = () => {
    return {
        x: Math.floor(Math.random() * mapSize) + 1,
        y: Math.floor(Math.random() * mapSize) + 1
    }
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
    if (!checkValueIsEmpty(allSnake)) {
        return allSnake.filter((snakeItem) => {
            let snakeItemHeadPosition = snakeItem.getSnakeHeadPosition();
            let foodPosition = food.getFoodPosition();
            if (checkEqualPositions(foodPosition, snakeItemHeadPosition)) {
                return snakeItem;
            }
        });
    }
    return null;
}

const checkKeydownIsExistOperation = (keydownEventCode, operationObject) => {
    return Object.keys(operationObject).some((operationItem) => {
        return operationItem === keydownEventCode;
    });
}

// // ignoreHead 用來忽略 bodyData 中拿到自己蛇頭的卡控
// const checkOnSnakeBody = (position, allSnake, {ignoreHead = false} = {}) => {
//     let result = allSnake.filter((snakeItem) => {
//         return snakeItem.snakeBody.filter((snakeBodyItem, index) => {
//             if (ignoreHead && index === 0) return false
//             return checkEqualPositions(snakeBodyItem, position);
//         })
//     });
// }

// const checkFoodOnSnakeBody = (allFood, allSnake) => {
//     // 回傳吃到的蛇跟那顆食物
//     let result = [];
//     allSnake.forEach((snakeItem) => {
//         allFood.forEach((foodItem) => {
//             let snakeItemHeadPosition = snakeItem.getSnakeHeadPosition();
//             let foodItemPosition = foodItem.getFoodPosition();
//             if (checkEqualPositions(snakeItemHeadPosition, foodItemPosition)) {
//                 result.push({
//                     snake: snakeItem,
//                     food: foodItem
//                 })
//             }
//         });
//     });
//     return result;
// }


export {
    getRandomPosition,
    getRandomFoodType,
    checkEqualPositions,
    checkPositionOutsideMap,
    checkPositionOnSnakeBody,
    // checkOnSnakeBody,
    checkFoodOnSnakeBody,
    checkKeydownIsExistOperation,
}
