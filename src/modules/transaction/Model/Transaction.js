const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  sender: { type: String, ref: 'User', required: true },
  receiver: { type: String, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  dateTransaction: {type: Date, required: true},
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
