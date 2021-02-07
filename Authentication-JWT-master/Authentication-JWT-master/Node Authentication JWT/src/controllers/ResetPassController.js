const User = require('../models/User');

/** MODULE EXPORT */
module.exports = {
    async store(request, response) {
        /** PEGANDO AS INFORMAÇÕES DO BODY */
        const { email, token, password } = request.body;

        try {
            const user = await User.findOne({ email })
            .select('+passwordResetToken passwordRestExpires');

            if (!user) {
                return response.json({ 'token': 'usuário não existe' });
            } else if (token !== user.passwordResetToken) {
                return response.json({ 'passwordResetToken': 'não existe' });
            } else {
                const now = new Date();
                if ( now > user.passwordResetExpires) {
                    return response.json({ 'passwordResetExpires': 'tempo acabou' });
                } else {
                    user.password = password;

                    await user.save();

                    response.send();
                }
            }

        } catch (error) {
            return response.json({ 'token': 'data base err' });
        }
    }
}