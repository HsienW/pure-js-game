import {mainGameCountdown} from '../main/main-game-countdown.js';

const gameTimeFinishRule = function () {
    const timeFinish = mainGameCountdown.countdownAction('checkFinish');
    return timeFinish ? 'game-over' : 'next';
}

const onlyOneTeamLeftRule = function () {
    const onlyOneTeam = false;
    return onlyOneTeam ? 'game-over' : 'next';
}

export {
    gameTimeFinishRule,
    onlyOneTeamLeftRule
}
