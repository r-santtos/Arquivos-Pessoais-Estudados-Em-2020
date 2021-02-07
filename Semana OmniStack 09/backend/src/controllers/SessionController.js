// Importações
const User = require('../models/User');

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
    async store(request, response) {
        // Buscando email de dentro do corpo da minha requisição
        const { email } = request.body;
        
        // Verificando se usuário já existe antes de criar um novo
        let user = await User.findOne({ email });

        if (!user) {
            // Criando uma sessão
            user = await User.create({ email });
        }

        // Retornando uma resposta
        return response.json(user);
    }
};