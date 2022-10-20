import { Router } from 'express';
import TeamC from '../Controllers/Team';

const routerTeam = Router();
const teamC = new TeamC();

routerTeam.get('/', (req, res) => teamC.getTeam(req, res));
routerTeam.get('/:id', (req, res) => teamC.getTeamID(req, res));

export default routerTeam;
