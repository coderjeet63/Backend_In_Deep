const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    senderId: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account', 
        required: true 
    },
    receiverId: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account', 
        required: true 
    },
    amount: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'success', 'failed'], 
        default: 'pending' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);