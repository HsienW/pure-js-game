const layoutSize = 21;

export const randomLayoutPosition = () => {
    return {
        x: Math.floor(Math.random() * layoutSize) + 1,
        y: Math.floor(Math.random() * layoutSize) + 1
    }
}
