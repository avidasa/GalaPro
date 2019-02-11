var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', (req, res) => {
    // Return User[] to the client
    User.find(function (err, users) {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.json(users);
    });
});

router.post('/', async (req, res) => {
    try {
        // Expecting request body to contain User[]
        for (const user of req.body) {
            try {
                // Find user by his name, and merge the original Actions[] with the data from the request
                // If not found, upsert insures a new user will be added
                await User.findOneAndUpdate({ name: user.name }, { $addToSet: {actions: user.actions} }, { upsert: true });
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        }
        // Return User[] to the client
        User.find(function (err, users) {
            if (err) {
                return res.status(500).json({ message: err.message })
            }
            res.json(users);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;