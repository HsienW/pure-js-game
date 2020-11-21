export const checkEqualPositions = (positionA, positionB) => {
    return positionA.x === positionB.x && positionA.y === positionB.y
}

export const checkOnSnakeBody = (position, bodyData, {ignoreHead = false} = {}) => {
    return bodyData.some((bodyItem, index) => {
        if (ignoreHead && index === 0) return false
        return checkEqualPositions(bodyItem, position)
    })
}
