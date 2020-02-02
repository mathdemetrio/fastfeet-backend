import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymansController from './app/controllers/DeliverymanController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

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

// Deliverymans authenticated routes
routes.post('/deliverymans', DeliverymansController.store);
routes.get('/deliverymans', DeliverymansController.index);
routes.get('/deliverymans/:id', DeliverymansController.show);
routes.put('/deliverymans/:id', DeliverymansController.update);
routes.delete('/deliverymans/:id', DeliverymansController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
