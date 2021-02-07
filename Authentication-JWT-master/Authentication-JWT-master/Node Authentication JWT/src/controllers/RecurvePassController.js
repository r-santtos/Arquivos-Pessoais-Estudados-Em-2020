const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

/** MODULE EXPORT */
module.exports = {
    async store(request, response) {
        /** PEGANDO AS INFORMAÇÕES DO BODY */
        const { email } = request.body;

        try {
            /** VERIFICANDO SE EMAIL EXISTE ANTES DE CRIAR UM */
            let user = await User.findOne({ email });

            if (!user) {
                /** EMAIL NÃO CADASTRADO */
                return response.json({ 'email': 'não exite' });
            }

            /** GERANDO UM TOKEN PARA RECUPERAR SENHA CASO EMAIL EXITA */
            const token = crypto.randomBytes(20).toString('hex');

            /** TEMPO DE VIDA DO TOKEN */
            const dateNow = new Date();
            dateNow.setHours(dateNow.getHours() + 1);

            /** SALVANDO O TOKEN */
            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: dateNow,
                }
            });

            const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com.br',
            service: 'smtp.hostinger.com.br',
            port: 587,
            segure: true,
            auth: {
                user: 'developer@analistacode.com',
                pass: '******'
            }
            });

            const mailOptions = {
            from: 'developer@analistacode.com',
            to: email,
            subject: 'Recuperar Senha',
            text: token
            };

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });

        } catch (err) {
            console.log(err);
            /** ERRO NO SERVIDOR */
            return response.json({ 'Err': 'Erro on forgott' });
        }
    }
}