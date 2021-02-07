// Importações
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

// Criando conexão com banco de dados
mongoose.connect('mongodb+srv://analistacode:kkgkg@analistacode-oh3nu.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Socket IO
const connectedUsers = {};

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
})

// Configurações do CORS
app.use(cors());

// Extensão para o express entender JSON
app.use(express.json());

// Configurações para leitura de arquivos estaticos
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

// Usando as rotas
app.use(routes);

// Definição de qual porta usar
server.listen(3333); 
