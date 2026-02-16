const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, min: 18 }
}, { timestamps: true });

// ✅ SAHI TAREÉKA: Model ka naam 'User' hona chahiye
module.exports = mongoose.models.User || mongoose.model('User', userSchema);