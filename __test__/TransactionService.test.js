const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const TransactionService = require('../src/modules/transaction/Service/TransactionService');
const UserService = require('../src/modules/user/Service/UserService');

let mongoServer;
jest.setTimeout(10000);

beforeAll(async () => {
/**
 * Create a new instance of the MongoMemoryServer
 *
 * @type {MongoMemoryServer}
 */
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  mongoose.connect(mongoUri);
});

/**
 * TransactionService test suite
 *
 * This suite tests the TransactionService, specifically the transferMoney method.
 */

describe('TransactionService', () => {
    
  describe('transferMoney', () => {
    /**
     * Should transfer money between users
     *
     * This test creates two users, transfers money from one to the other, and
     * verifies that the transaction is successful and the balances are updated.
     *
     * @example
     * const sender = await UserService.registerUser({
     *   fullName: 'Sender User',
     *   userName: 'sender.user',
     *   cpf: '12345678901',
     *   email: 'sender@example.com',
     *   password: 'teste',
     *   userType: 'common',
     *   balance: 1000,
     * });
     *
     * const receiver = await UserService.registerUser({
     *   fullName: 'Receiver User',
     *   userName: 'receiver.user',
     *   cpf: '98765432100',
     *   email: 'receiver@example.com',
     *   password: 'teste',
     *   userType: 'common',
     *   balance: 500,
     * });
     *
     * const amountToTransfer = 300;
     * const transaction = await TransactionService.transferMoney(sender._id, receiver._id, amountToTransfer);
     */
    it('should transfer money between users', async () => {
      const senderData = {
        fullName: 'Sender User',
        userName: 'sender.user',
        cpf: '12345678901',
        email: 'sender@example.com',
        password: 'teste',
        userType: 'common',
        balance: 1000,
      };

      const receiverData = {
        fullName: 'Receiver User',
        userName: 'receiver.user',
        cpf: '98765432100',
        email: 'receiver@example.com',
        password: 'teste',
        userType: 'common',
        balance: 500,
      };

      const sender = await UserService.registerUser(senderData);
      const receiver = await UserService.registerUser(receiverData);
      const amountToTransfer = 300;
      const transaction = await TransactionService.transferMoney(sender._id, receiver._id, amountToTransfer);
      expect(transaction).toBeDefined();
      expect(transaction.sender).toBe(sender._id);
      expect(transaction.receiver).toBe(receiver._id);
      expect(transaction.amount).toBe(amountToTransfer);
      expect(transaction.status).toBe('completed');
      const updatedSender = await UserService.getUserById(sender._id);
      const updatedReceiver = await UserService.getUserById(receiver._id);

      expect(updatedSender.balance).toBe(senderData.balance - amountToTransfer);
      expect(updatedReceiver.balance).toBe(receiverData.balance + amountToTransfer);
    });

    it('should handle insufficient funds' , async () => {
    /**
     * Should handle insufficient funds
     *
     * This test creates two users, attempts to transfer more money than the sender has,
     * and verifies that an error is thrown with the message 'Insufficient funds'.
     *
     * @example
     * const sender = await UserService.registerUser({
     *   fullName: 'Sender User',
     *   userName: 'sender.user',
     *   cpf: '12345678902',
     *   email: 'sender1@example.com',
     *   password: 'securepassword',
     *   userType: 'common',
     *   balance: 100,
     * });
     *
     * const receiver = await UserService.registerUser({
     *   fullName: 'Receiver User',
     *   userName: 'receiver.user',
     *   cpf: '98765432101',
     *   email: 'receiver1@example.com',
     *   password: 'securepassword',
     *   userType: 'common',
     *   balance: 500,
     * });
     *
     * const amountToTransfer = 200;
     * try {
     *   await TransactionService.transferMoney(sender._id, receiver._id, amountToTransfer);
     *   fail('Expected transferMoney to throw an error');
     * } catch (error) {
     *   expect(error.message).toBe('Insufficient funds');
     * }
     */
      const senderData = {
        fullName: 'Sender User',
        userName: 'sender.user',
        cpf: '12345678902',
        email: 'sender1@example.com',
        password: 'securepassword',
        userType: 'common',
        balance: 100,
      };

      const receiverData = {
        fullName: 'Receiver User',
        userName: 'receiver.user',
        cpf: '98765432101',
        email: 'receiver1@example.com',
        password: 'securepassword',
        userType: 'common',
        balance: 500,
      };

      const sender = await UserService.registerUser(senderData);
      const receiver = await UserService.registerUser(receiverData);

      const amountToTransfer = 200;
      try {
        await TransactionService.transferMoney(sender._id, receiver._id, amountToTransfer);
        fail('Expected transferMoney to throw an error');
      } catch (error) {
        expect(error.message).toBe('Insufficient funds');
      }
    });
  });

});


afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });