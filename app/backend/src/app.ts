import 'express-async-errors';
import * as express from 'express';
import errorHandler from './Middleware/err';

import routerLogin from './Routes/Login';
import routerTeam from './Routes/Team';
import routerMatch from './Routes/Matches';
import routerLeaderBoard from './Routes/LeaderBoard';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/login', routerLogin);
    this.app.use('/teams', routerTeam);
    this.app.use('/matches', routerMatch);
    this.app.use('/leaderboard', routerLeaderBoard);

    this.app.use(errorHandler);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
