const map = {
    width: 800,
    height: 400
};

const box = {
    width: 10,
    height: 10
};

const numbers = {
    height: map.width / box.width,
    width: map.height / box.height
};

let direction;
const snakeBody = [];
const mapOther = [];

const strategies = {
    37: () => {
        return direction = 'left';
    },
    38: () => {
        return direction = 'up';
    },
    39: () => {
        return direction = 'right';
    },
    40: () => {
        return direction = 'down';
    }
}

const initMap = () => {
    const map = document.querySelector('.map');
    map.style.width = map.width + 'px';
    map.style.height = map.height + 'px';

    let mapSpan = null;

    for (let i = 1; i <= numbers.height * numbers.width; i++) {
        mapSpan = document.createElement('div');
        mapSpan.style.width = box.width + 'px';
        mapSpan.style.height = box.height + 'px';
        mapSpan.className = 'box';
        mapSpan.id = i;
        map.appendChild(mapSpan);
        if (i <= 5) {
            mapSpan.className = 'snake-body';
            snakeBody.push(mapSpan);
        } else {
            mapOther.push(mapSpan);
        }
    }
}

const initKeyupSubscript = () => {
    document.onkeyup = (event) => {
        return strategies[event.keyCode];
    }
}

const createFood = () => {
    let index = Math.floor(Math.random() * mapOther.length);
    mapOther[index].className = 'food';
}

window.onload = () => {
    initMap();
    initKeyupSubscript();
    createFood();
}
