const User = require('../models/User');
const jwt = require('jsonwebtoken');
const hashToken = require('../config/authJWT.json');

/** GERANDO O TOKEN */
function gererateToken(params = {}) {
    return jwt.sign(params, hashToken.secret, {
        expiresIn: 86400,
    });
}

/** MODULE EXPORT */
module.exports = {
    async store(request, response) {
        /** PEGANDO AS INFORMAÇÕES DO BODY */
        const { name, email, password } = request.body;

        /** VERIFICANDO SE USER EXISTE ANTES DE CRIAR UM */
        let user = await User.findOne({ email });

        if (!user) {
            /** CRIANDO USER CASO NÃO EXISTA */
            user = await User.create({ name, email, password });
            user.password = undefined;
            return response.json({
                user,
                token: gererateToken({ id: user.id }),
            });

        } else {
            return response.json({ 'usuário': 'já cadastrado' });
        }
    }
}