// export const gameMap = document.getElementById('game-map');
// const mapSize = 41;

const Map = function (elementId, mapSize) {
    this.gameMap = document.getElementById(elementId);
    this.mapSize = mapSize;
    this.getMapSize = function () {
        return this.mapSize;
    }
}

const map = new Map('game-map', 41);

export {
    map
}

// export {
//     randomMapPosition,
//     outsideMap
// }
