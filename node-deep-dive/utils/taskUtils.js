// utils/taskUtils.js

function calculatePriority(status) {
    // 1. String ko lowercase kar lete hain taaki "URGENT" bhi chal jaye
    const lowerStatus = status ? status.toLowerCase() : "";

    if (lowerStatus === 'urgent') {
        return 1;
    } else if (lowerStatus === 'high') {
        return 2;
    } else if (lowerStatus === 'normal') {
        return 3;
    } else {
        return 5; // Default priority (Low)
    }
}

// 🔴 IMP: Export karna mat bhoolna!
module.exports = { calculatePriority };

