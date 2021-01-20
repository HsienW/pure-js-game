/** Mediator Pattern **/

import {noticeConfirm} from '../common/notice.js';
import {checkValueIsEmpty} from '../common/util.js';
import {halfwayFinishRuleChecker} from '../checker/checker.js';
import {mainGameMediator} from './main-game-mediator.js';
import {roleItemMediator} from './role-item-mediator.js';
// import {checkOnlySurviveTeam} from '../common/role-util.js';

// roleTeamMediator 負責中介管理團隊相關的行為
// 例如: 團隊計分、團隊勝利判定等等...

const roleTeamMediator = (function () {
    let allSnakeTeamScore = {};
    const operations = {};

    operations.checkSnakeTeamHalfwayWin = function () {
        const allSnake = roleItemMediator.getData('getAllSnake');
        const halfwayWinTeam = halfwayFinishRuleChecker(allSnake); // 時間還沒到, 但中途獲勝的團隊

        if (halfwayWinTeam) {
            const winTeamName = halfwayWinTeam[0][0].snakeTeam;
            mainGameMediator.callAction('gameFinish');
            operations.judgeSnakeTeamWin(winTeamName);
        }
    }

    operations.judgeSnakeTeamWin = function (winTeamName) {
        noticeConfirm(`${winTeamName} is winner!`);

        // let sameTeamAllSnake = allSnake[snakeTeam];

        // sameTeamAllSnake.forEach((teamMember) => {
        //     teamMember['snakeTeamLose']();
        // });

        // for (let team in allSnake) {
        //     if (team !== snakeTeam) {
        //         let otherTeamSnakes = allSnake[team];
        //         otherTeamSnakes.forEach((otherSnake) => {
        //             otherSnake['snakeTeamWin']();
        //         });
        //         // noticeConfirm(`${otherTeamSnakes[0].getSnakeTeam()} is winner!`);
        //     }
        // }
    };

    operations.addSnakeTeamScore = function (snake, score) {
        const snakeTeam = snake.getSnakeTeam();
        const isDead = snake.getSnakeDead();

        if (!isDead && checkValueIsEmpty(allSnakeTeamScore[snakeTeam])) {
            allSnakeTeamScore[snakeTeam] = score;
            console.log(allSnakeTeamScore);
            return;
        }
        allSnakeTeamScore[snakeTeam] = allSnakeTeamScore[snakeTeam] + score;
        console.log(allSnakeTeamScore);
    }

    //處理呼叫參數的介面
    const callAction = function () {
        let action = Array.prototype.shift.call(arguments);
        operations[action].apply(this, arguments);
    }

    return {
        callAction: callAction
    };
})();

export {
    roleTeamMediator
}
