import { Router } from 'express';
import Login from '../Controllers/Login';

const routerLogin = Router();

const login = new Login();

routerLogin.post('/', (req, res) => login.postLogin(req, res));
routerLogin.get('/validate', (req, res) => login.getUser(req, res));

export default routerLogin;
