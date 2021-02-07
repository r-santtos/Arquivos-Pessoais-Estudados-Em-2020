// Importações 
const mongoose = require('mongoose');

// Estrutura da tabela no banco de dados
const UserSchema = new mongoose.Schema({
    email: String,
});

// Exportação do modulo
module.exports = mongoose.model('User', UserSchema);