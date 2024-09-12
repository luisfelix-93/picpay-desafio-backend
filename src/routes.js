const express = require('express');
const Router = express.Router;
const UserController = require('./modules/user/Controller/UserController.js');
const TransactionController = require('./modules/transaction/Controller/TransactionController.js');
const SessionController = require('./modules/session/Controller/SessionController.js')
const auth = require('./middleware/auth.js')

const routes =  new Router();
routes.post('/sessions', SessionController.create)
routes.get('/user/:id', UserController.index)
routes.get('/user', UserController.getUser)
routes.post('/user', UserController.register)

routes.use(auth);

routes.post('/transfer', TransactionController.transfer)
routes.get('/transfer/:id', TransactionController.transactionsByUser)
routes.get('/monthlyTransactions', TransactionController.monthlyTransactions)
routes.get('/weeklyTransactions', TransactionController.weeklyTransactions)

module.exports = routes;