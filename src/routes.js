import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

export default routes;
