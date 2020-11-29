const layoutSize = 21;

// 亂數隨機產生在 21 * 21 範圍內的一組 x y 座標
export const randomLayoutPosition = () => {
    return {
        x: Math.floor(Math.random() * layoutSize) + 1,
        y: Math.floor(Math.random() * layoutSize) + 1
    }
}

export const outsideLayout = (position) => {
    return (position.x < 1 || position.x > layoutSize || position.y < 1 || position.y > layoutSize);
}
