const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {type:String, required: true },
  fullName: { type: String, required: true },
  cpf: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['common', 'merchant'], required: true },
  balance: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
