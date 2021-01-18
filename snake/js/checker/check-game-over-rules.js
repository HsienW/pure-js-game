const onlyOneTeamLeftRule = function () {
    const onlyOneTeam = false;
    return onlyOneTeam ? 'game-over' : 'next';
}

export {
    onlyOneTeamLeftRule
}
