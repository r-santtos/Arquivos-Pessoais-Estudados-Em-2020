// Importações
const Booking = require('../models/Booking');

// Esportações 
module.exports = {
    // Crianção de um novo Booking 
    async store(request, response) {
        // Buscando o usuário logado
        const { user_id } = request.headers;
        const { spot_id } = request.params;
        const { date } = request.body;

        // Criando o Booking
        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        // Retornando todos os dados descritivos do usuário
        await booking.populate('spot').populate('user').execPopulate();

        return response.json(booking);
    }
};