const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema
({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // 🔗 Link to User Model
        required: true 
    },
    accountType: 
    { 
        type: String, 
        enum: ['Savings', 'Current'], 
        required: true 
    },
    accountNumber: { type: Number, required: true, unique: true },
    balance: { type: Number, default: 0, min: 0 } // Balance negative nahi hona chahiye
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);