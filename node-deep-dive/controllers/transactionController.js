const mongoose = require('mongoose');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

exports.transferMoney = async (req, res) => {
    const session = await mongoose.startSession(); // 1. Session Start
    session.startTransaction(); // 2. Transaction Start

    try {
        const { senderAccNum, receiverAccNum, amount } = req.body;

        // Step A: Sender Account dhoondo
        const sender = await Account.findOne({ accountNumber: senderAccNum }).session(session);
        if (!sender || sender.balance < amount) {
            throw new Error("Insufficient Balance or Invalid Account");
        }

        // Step B: Receiver Account dhoondo
        const receiver = await Account.findOne({ accountNumber: receiverAccNum }).session(session);
        if (!receiver) {
            throw new Error("Receiver Account not found");
        }

        // Step C: Paise Kato (Atomic Operation)
        sender.balance -= amount;
        await sender.save({ session }); // 👈 Session pass karna zaruri hai

        // Step D: Paise Jodo (Atomic Operation)
        receiver.balance += amount;
        await receiver.save({ session });

        // Step E: Transaction History Record karo
        await Transaction.create([{
            senderId: sender._id,
            receiverId: receiver._id,
            amount: amount,
            status: 'success'
        }], { session });

        // ✅ Sab sahi hai? COMMIT karo (Save permanently)
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ success: true, message: "Transfer Successful!" });

    } catch (error) {
        // ❌ Kuch gadbad hui? ABORT (Rollback - Undo changes)
        await session.abortTransaction();
        session.endSession();
        
        console.error("Transaction Failed:", error);
        res.status(400).json({ success: false, message: "Transaction Failed", error: error.message });
    }
};

