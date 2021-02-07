// Importações
const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashbordController');
const BookingController = require('./controllers/BookingController');

const routes = express.Router();

const upload = multer(uploadConfig);

/** 
 * MÉTODOS PARA USAR ROTAS URLs
 * ----------------------------------
 * GET => Busca uma informação
 * POST => Criar informações
 * PUT => Editar informações
 * DELETE => Deletar informações
 */

/**
 * REQUEST.QUERY => Acessar query params na URL (para filtros)
 * REQUEST.PARAMS => Acessar route params (para edição e, delete)
 * REQUEST.BODY => Acessar corpo da requisição (para criação e, edição)
 */

 /**
 * REQUEST => para receber os parametros enviados pelo usuário
 * RESPONSE => para devolver alguma resposta ao usuário
 */

// Rotas
routes.post('/sessions', SessionController.store);
routes.get('/spots', SpotController.index);
routes.get('/dashboard', DashboardController.show);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.post('/spots/:spot_id/bookings', BookingController.store);


// Exportações
module.exports = routes;
