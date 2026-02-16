const { body, validationResult } = require('express-validator');

const taskValidationRules = [
    // TITLE: Yahan hum 'escape()' laga rahe hain
    body('title')
        .trim()
        .notEmpty().withMessage('Title likhna zaruri hai')
        .escape(), // 🛡️ ASLI HERO: Ye HTML tags ko text bana deta hai

    // DESCRIPTION: Ise bhi sanitize karna zaruri hai
    body('description')
        .trim()
        .escape(), // 🛡️ Yahan bhi lagao

    // Baaki rules same rahenge...
    body('priority').optional().isInt({ min: 1, max: 5 }),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

module.exports = { taskValidationRules, validate };