const mapSize = 21;

// 亂數隨機產生在 21 * 21 範圍內的一組 x y 座標
export const randomMapPosition = () => {
    return {
        x: Math.floor(Math.random() * mapSize) + 1,
        y: Math.floor(Math.random() * mapSize) + 1
    }
}

export const outsideMap = (position) => {
    return (position.x < 1 || position.x > mapSize || position.y < 1 || position.y > mapSize);
}
