const jwt = require('jsonwebtoken');
const axios = require('axios');
const {checkPassword} = require('../../../services/auth')
const authConfig = require('../../../config/auth');
const userService = require('../../user/Service/UserService');
const EmailService = require('../../externalService/email/EmailService');
const Session = require('../Model/Session');
class SessionService {
    async createSession(cpf, password) {
        
        const findUser = await userService.getUserByCPF(cpf)

        if(!findUser) {
            return res.status(401).json({error: "User / password inválido"});
        };

        if(!checkPassword(findUser, password)) {
            return res.status(401).json({error: "User / password inválido!"});
        };

        const idUser = findUser.id;
        const userName = findUser.userName;

        const dataAtual = new Date();

        // Opções para obter informações locais
        const opcoesLocais = { timeZone: 'America/Sao_Paulo', hour12: false };

        // Formatando a data com informações locais
        const formatoData = new Intl.DateTimeFormat('pt-BR', opcoesLocais);
        const dateSession = formatoData.format(dataAtual);

        let email = findUser.email;
        let subject = 'Sessão iniciada';
        let geoIp = await axios.get("http://ip-api.com/json");
        let city = geoIp.data.city;
        let countryCode = geoIp.data.countryCode;

        await EmailService.sessionLoc(email, userName, subject, city, countryCode, dataAtual);

        const token = jwt.sign(idUser, authConfig.secret, {
            // expiresIn: authConfig.expiresIn
        })

        const dtExpiresIn = authConfig.expiresIn
        const session = { 
            idUser,
            nmUser: userName,
            token,
            expiresIn: authConfig.expiresIn, 
            dtSession : dataAtual
        };

        const newSession = new Session(session);
        await newSession.save();

        return session;
        

        

    }
}

module.exports = new SessionService();