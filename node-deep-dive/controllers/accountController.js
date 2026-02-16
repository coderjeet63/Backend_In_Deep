const Account = require('../models/Account');

exports.createAccount = async (req, res) => {
    try {
        const { userId, accountType, initialBalance } = req.body;
        
        // Random Account Number generate karo
        const accNum = Math.floor(1000000000 + Math.random() * 9000000000);

        const account = await Account.create({
            user: userId,
            accountType,
            accountNumber: accNum,
            balance: initialBalance
        });

        res.status(201).json({ success: true, data: account });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};