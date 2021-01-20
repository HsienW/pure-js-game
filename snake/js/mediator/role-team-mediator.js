/** Mediator Pattern **/

import {noticeConfirm} from '../common/notice.js';
import {checkValueIsEmpty, checkObjectIsEmpty} from '../common/util.js';
import {halfwayFinishRuleChecker} from '../checker/checker.js';
import {mainGameMediator} from './main-game-mediator.js';
import {roleItemMediator} from './role-item-mediator.js';
// import {checkOnlySurviveTeam} from '../common/role-util.js';

// roleTeamMediator 負責中介管理團隊相關的行為
// 例如: 團隊計分、團隊勝利判定等等...

const roleTeamMediator = (function () {
    let allTeamScore = {};
    let winTeam = {};
    const operations = {};

    operations.addTeamScore = function (snake, score) {
        const team = snake.getSnakeTeam();
        const isDead = snake.getSnakeDead();

        if (!isDead && checkValueIsEmpty(allTeamScore[team])) {
            allTeamScore[team] = score;
            console.log(allTeamScore);
            return;
        }
        allTeamScore[team] = allTeamScore[team] + score;
        console.log(allTeamScore);
    }

    operations.compareTeamTotalScore = function () {
        for (let team in allTeamScore) {

            if (checkObjectIsEmpty(winTeam)) {
                winTeam[team] = allTeamScore[team];
                return;
            }

            if (allTeamScore[team] > winTeam[team]) {

            }

            // if (team !== snakeTeam) {
            //     let otherTeamSnakes = allSnake[team];
            //     otherTeamSnakes.forEach((otherSnake) => {
            //         otherSnake['snakeTeamWin']();
            //     });
            //     // noticeConfirm(`${otherTeamSnakes[0].getSnakeTeam()} is winner!`);
            // }
        }
    }

    operations.checkTeamHalfwayWin = function () {
        const allSnake = roleItemMediator.getData('getAllSnake');
        const halfwayWinTeam = halfwayFinishRuleChecker(allSnake); // 時間還沒到, 但中途獲勝的團隊

        if (halfwayWinTeam) {
            const winTeamName = halfwayWinTeam[0][0].snakeTeam;
            mainGameMediator.callAction('gameFinish');
            operations.judgeTeamWin(winTeamName);
        }
    }

    operations.judgeTeamWin = function (winTeamName) {
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
