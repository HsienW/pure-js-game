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

const checkPositionOnSnakeBody = (position, snakeBody) => {
    // 回傳撞到自己的蛇
    return snakeBody.filter((bodyItem, index) => {
        if (index === 0) return false
        return checkEqualPositions(position, bodyItem)
    })
}

const checkFoodOnSnakeBody = (food, allSnake) => {
    // 回傳吃到的蛇跟那顆食物
    return allSnake.filter((snakeItem) => {
        let snakeItemHeadPosition = snakeItem.getSnakeHeadPosition();
        let foodPosition = food.getFoodPosition();
        if (checkEqualPositions(foodPosition, snakeItemHeadPosition)) {
            return snakeItem;
        }
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

const checkKeydownIsExistOperation = (keydownEventCode, operationObject) => {
    return Object.keys(operationObject).some((operationItem) => {
        return operationItem === keydownEventCode;
    });
}

export {
    getRandomPosition,
    checkEqualPositions,
    checkPositionOnSnakeBody,
    // checkOnSnakeBody,
    checkFoodOnSnakeBody,
    checkKeydownIsExistOperation,
}
