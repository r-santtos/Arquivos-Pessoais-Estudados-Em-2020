const User =  require('../models/User');
const bcrypt = require('bcrypt');
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
        const { email, password } = request.body;

        /** VERIFICANDO SE USER E PASS EXISTE */
        let user = await User.findOne({ email }).select('password');

        if (!user) {
            return response.json({ 'usuário': 'não cadastrado' });

            /** VERIFICANDO SE SENHA SÃO IGUAIS */
        } else if (!await bcrypt.compare(password, user.password)) {
            return response.json({ 'senha': 'não errada' });

        } else {
            user.password = undefined;

            response.send({ 
                user,
                token: gererateToken({ id: user.id }),
            });
        }
    }
}