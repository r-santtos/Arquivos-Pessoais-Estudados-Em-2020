module.exports = {
    async show(request, response) {
        response.send({ ok: true, use: request.userId });
    }
}