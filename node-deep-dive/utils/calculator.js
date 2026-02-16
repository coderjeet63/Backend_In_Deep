// utils/calculator.js

// 1. Function Define kiya
const add = (a, b) => {
    return a + b;
};

const subtract = (a, b) => {
    return a - b;
};

// 🔴 IMP: Ye line shayad miss ho gayi thi
// Iske bina dusri file ko kuch nahi dikhega
module.exports = { add, subtract };