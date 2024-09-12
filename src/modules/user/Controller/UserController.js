const userService = require('../Service/UserService');

class UserController {
    async register(req, res) {
        try {
            const {userName, fullName, cpf, email, password, userType, balance} = req.body;
            const findUser = await userService.getUserByCPF(cpf);
            if(findUser){
                return res.status(409).send("Usuario já existe");
            }
            const user = await userService.registerUser(userName, fullName, cpf, email, password, userType, balance);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    async index(req, res) {
        try{
            const {id} = req.params;
            const user = await userService.getUserById(id);
            if(!user){
                return res.status(404).send("Usuario não encontrado");
            }
            return res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        } 
    };

    async getUser(req, res) {
        try{
            const users = await userService.getUser();
            if(!users){
                return res.status(404).send("Usuario não encontrado");
            }
            return res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
module.exports = new UserController();

