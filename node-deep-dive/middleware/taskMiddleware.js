const taskMidd = (req, res, next) => {

    const { title, description } = req.body;


    if (!title || !description) {
        return res.status(400).json({ 
            success: false, 
            message: "Validation Failed: Title and Description are required" 
        });
    }
    next(); 
};

module.exports = taskMidd;