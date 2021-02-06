const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Definindo o local dos arquivos
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));

// Definindo os formato dos arquivos que no caso é HTML
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Renderizando o arquivo INDEX 
app.use('/', (req, res) => {
    res.render('index.html');
});

let messages = []; // Array para guarda as msgs 

// Criando a conexão atraves dos sockets
io.on('connection', socket => {
    
    // Enviando msgs apenas para um socket exclusivo
    socket.emit('previousMessages', messages);

    // Recebendo os dados das msgs e tratando os dados
    socket.on('sendMessage', data => {
        messages.push(data);

        // Enviando os dados tratados para todos conectados 
        socket.broadcast.emit('receivedMessage', data);
    });
});

server.listen(3333);