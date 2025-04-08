const User = require('../models/user.model');
const bcrypt = require('bcrypt');

//verifying user credentials
const loginFunc = async (req, res) => { 
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        
        // Return user details (excluding password)
        const userResponse = {
            id: user._id,
            username: user.username,
            role: user.role
        };
        
        res.json(userResponse);
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

//creating new user entry
const registerFunc = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        
        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        
        const user = await User.create({ username, password, role });
        
        res.status(201).json({
            id: user._id,
            username: user.username,
            role: user.role,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { loginFunc, registerFunc };   
