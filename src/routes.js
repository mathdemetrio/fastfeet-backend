import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Users admin routes
routes.post('/users', UserController.store);

// Sessions routes
routes.post('/sessions', SessionController.store);

// Recipients not authenticated routes
routes.get('/recipients/:id', RecipientController.show);

// Authentication Middleware
routes.use(authMiddleware);

// Recipients authenticated routes
routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);
routes.delete('/recipients/:id', RecipientController.delete);
routes.put('/recipients/:id', RecipientController.update);

export default routes;
