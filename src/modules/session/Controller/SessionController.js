const jwt = require('jsonwebtoken');
const axios = require('axios');
const {checkPassword} = require('../../../services/auth')
const authConfig = require('../../../config/auth');
const userService = require('../../user/Service/UserService');
const EmailService = require('../../externalService/email/EmailService');
const SessionService = require('../Service/SessionService');
class SessionController {
    async create(req, res) {
        const { cpf, password} = req.body;
        const findUser = await userService.getUserByCPF(cpf)
        try{
            const session = await SessionService.createSession(cpf, password);
            res.status(200).json(session);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new SessionController();
