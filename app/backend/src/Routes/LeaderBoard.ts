import * as express from 'express';
import LeaderBoardC from '../Controllers/LeaderBoard';

const routerLeaderBoard = express.Router();
const controller = new LeaderBoardC();

routerLeaderBoard.get('/home', controller.home);
routerLeaderBoard.get('/away', controller.away);
routerLeaderBoard.get('/', controller.total);

export default routerLeaderBoard;
