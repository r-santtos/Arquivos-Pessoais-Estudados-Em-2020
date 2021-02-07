// Importações
const Spot = require('../models/Spot');

// Exportações
module.exports = {
    async show(request, response) {
        // Bucando os dados do usuário logado
        const { user_id } = request.headers;

        // Listando todos os spots do usuário
        const spots = await Spot.find({ user: user_id });
        

        return response.json(spots);
    }
}