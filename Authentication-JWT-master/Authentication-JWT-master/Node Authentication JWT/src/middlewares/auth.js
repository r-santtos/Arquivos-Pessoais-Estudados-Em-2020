const jwt = require('jsonwebtoken');
const authConfig = require('../config/authJWT.json');

module.exports = (request, response, next) => {
    const authHeader = request.headers.authorization;

    /** VERIFICANDO SE TOKEN EXISTE */
    if (!authHeader) {
        return response.status(401).send({ error: 'No Token Provided' });
    } else {
        /** VERIFICANDO SE O FORMATO É VALIDO DO TOKEN */
        const parts = authHeader.split(' ');
        
        if (!parts.length === 2) {
            return response.status(401).send({ error: 'No Token Format Invalide' });
        } else {
            const [ scheme, token ] = parts;
            /** VERIFICANDO SE SCHEMA TE A PALAVRA BEARER DO TOKEN */
            if (!/^Bearer$/i.test(scheme)) {
                return response.status(401).send({ error: 'Not Key Word Bearer' }); 
            } else {
                /** VERIFICANDO O TOKEN SE É IGUAL */
                jwt.verify(token, authConfig.secret, (err, decoded) => {
                    if (err) {
                        return response.status(401).send({ error: 'Token not Igual' });
                    } else {
                        request.userId = decoded.id;
                        return next();
                    }
                });
            }
        }
    }
};