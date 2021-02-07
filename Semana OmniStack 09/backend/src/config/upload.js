// Importações
const multer = require('multer');
const path = require('path');

// Exportações
module.exports = {
    // Definindo onde vai salvar os arquivos
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),

        // Importando o arquivos
        filename: (request, file, callback) => {
            /**
             * FIELDNAME => O NOME ORIGINAL DO ARQUIVO RECEBIDO
             * DATE.NOW => RETORNA A DATA DO REGISTRO E ADD AO NOME DO ARQUIVO COMO UM ID
             * PATH.EXTNAME => RETORNA O FORMATO DO ARQUIVO
             */

            // Definindo o nome do arquivo
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            callback(null, `${name}-${Date.now()}${ext}`);
        },
    }),
}