const axios = require('axios');
const User = require('../../user/Model/User');
const Transaction = require('../Model/Transaction');
const userService = require('../../user/Service/UserService')
const emailService = require('../../externalService/Email/emailService')

class TransactionService {
  async transferMoney(senderId, receiverId, amount) {
    try {
      const sender = await User.findById(senderId);
      const receiver = await User.findById(receiverId);

      if (!sender || !receiver) {
        throw new Error('Invalid sender or receiver');
      }

      if(sender.userType == 'merchant') {
        throw new Error("Merchants can't send money");
      }

      if (sender.balance < amount) {
        throw new Error('Insufficient funds');
      }

      // Simulate external authorization service
      const authorizationResponse = await axios.get('https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc');

      if (authorizationResponse.data.message !== 'Autorizado') {
        throw new Error('Transaction authorization failed');
      }

      sender.balance -= amount;
      receiver.balance += amount;

      await sender.save();
      await receiver.save();
      let dateTransaction = new Date();

      const transaction = new Transaction({
        sender: sender.fullName,
        receiver: receiver.fullName,
        amount,
        status: 'completed',
        dateTransaction
      });
    
      const notificationAuth = await axios.get('https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6');
      if(notificationAuth.data.message){
        await emailService.sendReceipt(receiver.email, 'transaction', transaction)
      }
      
      await transaction.save();
      
      
      return transaction;
    } catch (error) {
      throw error;
    }
  }

  async getTransactionById(idUser) {
    try{
      const user = await User.findOne({_id : idUser});
      if(!user){
        return 'Usuário não encontrado';
      }
      const transactions = await Transaction.findOne({sender : user.userName});
      return transactions;
    } catch(error){
      throw error;
    }
  }

  async getMonthlyTransactions() {
    try{
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      const monthTransactions = await Transaction.find({ dateTransaction : {$gte : lastMonth}})
      if(!monthTransactions){
        return "Transações mensais não encontradas"
      }
      return monthTransactions
    } catch(error){
      throw error;
    }
  } 

  async getWeeklyTransactions() {
  try {   
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const weeklyTransactions = await Transaction.find({ dateTransaction : {$gte : lastWeek}})
    if(!weeklyTransactions) {
      return "Transações semanais não encontradas."
    }
    return 
  } catch(error){
    throw error;
  }
  }
}

module.exports = new TransactionService();
