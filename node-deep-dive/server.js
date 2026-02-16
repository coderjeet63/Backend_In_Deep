require('dotenv').config();

const app = require('./app'); // import express app
const mongo = require('./services/mongoConnection');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // DB connect
        await mongo();

        // start server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();
