// import {GameStartState, GamePauseState, GameFinishState} from '';

const Main = function (mainStateHandler) {
    this.mainStateHandler = mainStateHandler;
    this.buttom = null;
    this.currentState = null;
    this.gameStartState = new GameStartState;
    this.gamePauseState = new GamePauseState;
    this.gameFinishState = new GameFinishState;
}

Main.prototype.initGameMain = function () {

}

Main.prototype.gameStart = function () {
    this.mainStateHandler.isStart();
    this.currentState = this.gameStartState;
}

Main.prototype.gamePause = function () {
    this.mainStateHandler.isPause();
    this.currentState = this.gamePauseState;
}

Main.prototype.gameFinish = function () {
    this.mainStateHandler.isFinish();
    this.currentState = this.gameFinishState;
}

const MainStateFactory = (function () {
    const state = function () {};
})();
