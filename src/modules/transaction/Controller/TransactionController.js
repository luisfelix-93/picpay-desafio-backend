const transactionService = require('../Service/TransactionService')


class TransactionController {
    async transfer(req, res) {
        try{
            const { senderId, receiverId, amount } = req.body;
            const transaction = await transactionService.transferMoney(senderId, receiverId, amount);
            res.status(200).json(transaction);

        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    };

    async transactionsByUser(req, res) {
        try{ 
            const userTransactions = await transactionService.getTransactionById(idUser);
            if(!userTransactions){
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            return res.status(200).json(userTransactions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async monthlyTransactions(req, res) {
        try{
            const monthTransactions = await transactionService.getMonthlyTransactions();
            if(!monthTransactions) {
                return res.status(404).json({message : "Transações mensais não encontradas"})
            }
            return res.status(200).json(monthTransactions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async weeklyTransactions(req, res) {
        try {
            const weekTransactions = await transactionService.getWeeklyTransactions();
            if(!weekTransactions) {
                return res.status(404).json({message : "Transações semanais não encontradas"})
            }
            return res.status(200).json(weekTransactions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}
module.exports = new TransactionController(); 