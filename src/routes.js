import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymansController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import StartDeliveryController from './app/controllers/StartDeliveryController';
import FinalizeDeliveryController from './app/controllers/FinalizeDeliveryController';
import ProblemController from './app/controllers/ProblemController';
import ProblematicDeliveriesController from './app/controllers/ProblematicDeliveriesController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Users admin routes
routes.post('/users', UserController.store);

// Sessions routes
routes.post('/sessions', SessionController.store);

// Recipients not authenticated routes
routes.get('/recipients/:id', RecipientController.show);

// Deliverymans not authenticates routes
routes.get('/deliverymans/:id/deliveries', StartDeliveryController.index);
routes.put(
  '/deliverymans/:deliveryman/deliveries/:delivery/start-delivery',
  StartDeliveryController.update
);
routes.put(
  '/deliverymans/:deliveryman/deliveries/:delivery/finalize-delivery',
  FinalizeDeliveryController.update
);

// Problems routes
routes.post('/deliveries/:deliveryId/problems', ProblemController.store);
routes.get('/deliveries/:deliveryId/problems', ProblemController.index);

// upload image route
routes.post('/files', upload.single('file'), FileController.store);

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

// Delivery authenticated routes
routes.post('/deliveries', DeliveryController.store);
routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:id', DeliveryController.show);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

// deliveris with problems
routes.get('/problematic-deliveries', ProblematicDeliveriesController.index);
// cancel delivery route
routes.delete(
  '/problem/:problemId/cancel-delivery',
  ProblematicDeliveriesController.delete
);

export default routes;
