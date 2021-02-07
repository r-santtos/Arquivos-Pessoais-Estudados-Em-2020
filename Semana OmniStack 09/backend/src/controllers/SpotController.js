// Importações
const User = require('../models/User');
const Spot = require('../models/Spot');

/**
 * MÉTODOS PARA USAR NO BANCO DE DADOS
 * ----------------------------------------------
 * INDEX => Retorna uma listagem total
 * SHOW => Retorna uma única sessão da lista
 * STORE => Criar uma sessão
 * UPDATE => Atualizar uma sessão 
 * DESTROY => Deletar uma sessão 
 */

// Exportações 
module.exports = {
    // Listando os spots com filtros
    async index(request, response) {
        // Buscando informações com filtro
        const { tech } = request.query;
        const spots = await Spot.find({ techs: tech });
        return response.json(spots);
    },

    // Criando os spots no banco de dados
    async store(request, response) {
        // Importando as informações para por no banco de dados
        const { filename } = request.file;
        const { company, techs, price } = request.body;
        const { user_id } = request.headers;

        // Verificando se o usuário existe antes de fazer o registro no banco
        const user = await User.findById(user_id);

        if (!user) {
            return response.status(400).json({ erro: 'user not' });
        }

        // Criando o Spot
        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            // Criando uma array separando por virgulas e tirando os espaços em branco
            techs: techs.split(',').map(tech => tech.trim()),
            price
        })

        return response.json(spot);
    }
};