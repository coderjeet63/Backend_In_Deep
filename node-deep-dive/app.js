const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const helmet = require('helmet')
const cors = require('cors');

const User = require('./models/User.js'); // Existing user schema
const Account = require('./models/Account.js'); // Naya banaya hua
const Transaction = require('./models/Transaction.js'); // Naya banaya hua

const { taskValidationRules, validate } = require('./validators/taskValidator');
const morgan = require('morgan');
const logger = require('./utils/logger');

// ... (Upar wale saare imports same rahenge)

const app = express();

// 1. SECURITY & PARSING (Sabse pehle)
app.use(helmet());
app.use(cors('*'));
app.use(express.json());

// 2. LOGGING (Traffic record karne ke liye)
const morganFormat = ':method :url :status :response-time ms';
app.use(morgan(morganFormat, {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
}));

// 3. RATE LIMITING (Attackers ko rokne ke liye)
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: { status: 429, message: "Too many requests, try again later." }
});
app.use(limiter);

// ================= BANKING ROUTES =================

// 👤 1. USER REGISTRATION (Banking Customer)
app.post('/api/users/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// 🏦 2. CREATE ACCOUNT (1:Many Relation)
app.post('/api/accounts/create', async (req, res) => {
    try {
        const { userId, accountType, initialBalance } = req.body;
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
});

// 💸 3. THE ACID TRANSACTION (Money Transfer)
app.post('/api/transactions/transfer', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { senderAccNum, receiverAccNum, amount } = req.body;

        // A. Sender check
        const sender = await Account.findOne({ accountNumber: senderAccNum }).session(session);
        if (!sender || sender.balance < amount) throw new Error("Insufficient funds or invalid account");

        // B. Receiver check
        const receiver = await Account.findOne({ accountNumber: receiverAccNum }).session(session);
        if (!receiver) throw new Error("Receiver account not found");

        // C. Update Balances
        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save({ session });
        await receiver.save({ session });

        // D. Create Transaction Record
        await Transaction.create([{
            senderId: sender._id,
            receiverId: receiver._id,
            amount,
            status: 'success'
        }], { session });

        await session.commitTransaction(); // ✅ Save everything
        res.json({ success: true, message: "Transfer Successful" });

    } catch (error) {
        await session.abortTransaction(); // ❌ Rollback if any step fails
        res.status(400).json({ success: false, message: error.message });
    } finally {
        session.endSession();
    }
});

// app.get('/api/transactions/statement/:accountNumber', async (req, res) => {
//     try {
//         const accountNumber = req.params.accountNumber;
          
//         const {accountId , balance} =   await Account.find({_id:accountNumber})
        
//            // yha accountid se transcation nikalunga 

//              // sort by time 

               


//               // sender ki hue to current account se minus se reciever se hue to curr
               
                     
               
         
         
//     } catch (err) {
//         res.status(400).json({ success: false, message: err.message });
//     }
// });

 

// ================= TASK ROUTES (Existing) =================

// ... (Tumhare tasks wale saare routes yahan aayenge) ...

// ================= ERROR HANDLING =================
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});

module.exports = app;
