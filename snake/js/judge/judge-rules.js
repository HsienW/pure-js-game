import {mapSize} from '../map.js';

const outsideMapRule = (position) => {
    return (position.x < 1 || position.x > mapSize || position.y < 1 || position.y > mapSize) ? 'pass' : 'next';
}

// bodyIntersectionRule

export {
    outsideMapRule,
    // bodyIntersectionRule
}
