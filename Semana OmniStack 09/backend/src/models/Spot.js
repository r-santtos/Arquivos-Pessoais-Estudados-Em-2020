// Importações 
const mongoose = require('mongoose');

// Estrutura da tabela no banco de dados
const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: String,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { // Configuração Mongoose para rotas de imagens
    toJSON: {
        virtuals: true,
    }
});

// Criando um virtual 
SpotSchema.virtual('thumbnail_url').get(function() {
    return `http://localhost:3333/files/${this.thumbnail}`
});

// Exportação do modulo
module.exports = mongoose.model('Spot', SpotSchema);