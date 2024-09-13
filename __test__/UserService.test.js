/**
 * UserService test suite
 *
 * This suite tests the UserService module, specifically the registerUser method.
 */
const UserService = require("../src/modules/user/Service/UserService")
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

/**
 * Create a new instance of the MongoMemoryServer
 *
 * @type {MongoMemoryServer}
 */

let mongoServer;

/**
 * Increase the timeout for Jest to 10 seconds
 *
 * @see https://jestjs.io/docs/en/configuration#timeout
 */

jest.setTimeout(10000); 

beforeAll(async () => {
    /**
     * Create a new instance of the MongoMemoryServer
     *
     * @see https://github.com/nodkz/mongodb-memory-server
     */
    mongoServer = await MongoMemoryServer.create();
    const mongoUri =  mongoServer.getUri();
    /**
     * Connect to the MongoMemoryServer instance using Mongoose
     *
     * @see https://mongoosejs.com/docs/index.html
     */
    mongoose.connect(mongoUri);
  });
/**
 * Describe the UserService module
 *
 * @see https://jestjs.io/docs/en/api#describe
 */
describe('UserService', () => {
    /**
     * Describe the registerUser method
     *
     * @see https://jestjs.io/docs/en/api#describe
     */
    describe('registerUser', () => {
      it('should register a new user', async () => {
        /**
         * Test that the registerUser method registers a new user
         *
         * @example
         * const userData = {
         *   userName: 'john.doe',
         *   fullName: 'John Doe',
         *   cpf: '12345678900',
         *   email: 'john@example.com',
         *   password: 'teste',
         *   userType: 'common',
         *   balance: 1000,
         * };
         *
         * const newUser = await UserService.registerUser(userData);
         *
         * expect(newUser).toBeDefined();
         * expect(newUser.fullName).toBe(userData.fullName);
         * expect(newUser.cpf).toBe(userData.cpf);
         * expect(newUser.email).toBe(userData.email);
         * expect(newUser.userType).toBe(userData.userType);
         * expect(newUser.balance).toBe(userData.balance);
         */
        const userData = {
            userName: 'john.doe',
            fullName: 'John Doe',
            cpf: '12345678900',
            email: 'john@example.com',
            password: 'teste',
            userType: 'common',
            balance: 1000,
        };

        const newUser = await UserService.registerUser(userData);
  
        expect(newUser).toBeDefined();
        expect(newUser.fullName).toBe(userData.fullName);
        expect(newUser.cpf).toBe(userData.cpf);
        expect(newUser.email).toBe(userData.email);
        expect(newUser.userType).toBe(userData.userType);
        expect(newUser.balance).toBe(userData.balance);

      });
    });
  
    
});

afterAll(async () => {
    // Fechar a conexão do mongoose e parar o servidor de banco de dados em memória após todos os testes
    await mongoose.disconnect();
    await mongoServer.stop();
});