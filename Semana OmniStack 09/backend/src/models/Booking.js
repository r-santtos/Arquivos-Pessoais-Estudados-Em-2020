// Importações 
const mogoose = require('mongoose');

// Estrutura da tabela no banco de dados
const BookingSchema = new mogoose.Schema({
    date: String,
    approved: Boolean,
    user: {
        type: mogoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    spot: {
        type: mogoose.Schema.Types.ObjectId,
        ref: 'Spot'
    }
});

// Exportação do modulo
module.exports = mogoose.model('Booking', BookingSchema);