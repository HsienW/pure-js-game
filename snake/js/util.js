const checkEqualPositions = (positionA, positionB) => {
    return positionA.x === positionB.x && positionA.y === positionB.y
}

// ignoreHead 用來忽略 bodyData 中拿到自己蛇頭的卡控
const checkOnSnakeBody = (position, bodyData, {ignoreHead = false} = {}) => {
    return bodyData.some((bodyItem, index) => {
        if (ignoreHead && index === 0) return false
        return checkEqualPositions(bodyItem, position)
    })
}

export {
    checkEqualPositions,
    checkOnSnakeBody
}
