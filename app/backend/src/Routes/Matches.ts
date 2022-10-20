import { Router } from 'express';
import MatchesC from '../Controllers/Matches';

const routerMatches = Router();
const matchesC = new MatchesC();

routerMatches.get('/', (req, res) => matchesC.getMatches(req, res));
routerMatches.post('/', (req, res) => matchesC.postMatches(req, res));
routerMatches.patch('/:id/finish', (req, res) => matchesC.pathMatches(req, res));
routerMatches.patch('/:id', (req, res) => matchesC.pathMatchesInProgress(req, res));

export default routerMatches;
