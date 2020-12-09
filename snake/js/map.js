const Map = function (elementId, mapSize) {
    this.gameMap = document.getElementById(elementId);
    this.mapSize = mapSize;
    this.getMapSize = function () {
        return this.mapSize;
    }
}

const map = new Map('game-map', 41);
const mapSize = map.getMapSize();

export {
    map,
    mapSize
}
