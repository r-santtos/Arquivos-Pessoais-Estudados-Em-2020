const socket = io('http://localhost:3333');

//Função para renderização em tela das msgs
function renderMessage(message) {
    $('.messages').append('<div class="message"><strong>'+ message.author +'</strong>: '+ message.message +' </div>');
}


// Ouvindo as msgs e salvando msg enviadas 
socket.on('previousMessages', function(message) {
    for (message of message) {
        renderMessage(message);
    }
});

// Ouvindo as resposta do servidor
socket.on('receivedMessage', function(message) {
    renderMessage(message);
});

$('#chat').submit(function(event) {
    event.preventDefault();

    // Buscando as informações dos inputs
    const author = $('input[name=username').val();
    const message = $('input[name=message').val();

    // Verificando se os campos do inputs não estão vazios
    if (author.length && message.length) {
        const messageObject = {
            author: author,
            message: message,
        };

        renderMessage(messageObject);

        // Enviando o objeto
        socket.emit('sendMessage', messageObject);
    }
});