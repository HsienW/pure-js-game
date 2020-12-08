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
    checkEqualPositions,
    checkOnSnakeBody,
    checkKeydownIsExistOperation
}
