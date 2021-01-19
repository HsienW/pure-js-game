import {checkOnlySurviveTeam} from '../common/util.js';

const onlySurviveTeamRule = function (allSnake) {
    const onlySurviveTeam = checkOnlySurviveTeam(allSnake);
    return onlySurviveTeam ? onlySurviveTeam : 'next';
}

export {
    onlySurviveTeamRule
}
