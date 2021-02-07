const express = require('express');
const authMiddleware = require('./middlewares/auth');
const AuthController = require('./controllers/AuthController');
const TokenController = require('./controllers/TokenController');
const ProjectController = require('./controllers/ProjectController');
const RecurvePassController = require('./controllers/RecurvePassController');
const ResetPassController = require('./controllers/ResetPassController');

const routes = express.Router();

/** ROUTES */
routes.post('/auth', AuthController.store);
routes.post('/token', TokenController.store);
routes.post('/recorve', RecurvePassController.store);
routes.get('/project', authMiddleware, ProjectController.show);
routes.post('/resetpass', ResetPassController.store);

/** MODULE EXPORT */
module.exports = routes;