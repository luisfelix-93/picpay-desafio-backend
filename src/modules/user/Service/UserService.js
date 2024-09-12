const User = require('../Model/User.js');
const {createPasswordHash} = require('../../../services/auth.js')

class UserService {
  // async registerUser(userData) {
  //   try {
  //     const user = new User(userData);
  //     await user.save();
  //     return user;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async registerUser(userName, fullName, cpf, email, password, userType, balance) {
    try{
      const encryptadePassword = await createPasswordHash(password);
      const user = {userName, fullName, cpf, email, password : encryptadePassword , userType, balance};
      const newUser = new User(user);
      await newUser.save();
      return newUser;
    } catch(error) {
      throw error;
    }
  }

  async getUser() {
    try{
      const user = await User.find();
      if(!user) {
        throw 'Nenhum usuário encontrado!';
      }
      return user;
    } catch(error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      return await User.findById(userId);
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  async getUserByCPF(cpf) {
    try {
      return await User.findOne({ cpf });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
