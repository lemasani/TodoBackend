const {User, validateUser} = require('../model/userModel');
const bcrypt = require('bcrypt'); 


exports.registerUser = async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({message: 'User already exisits. Please sign in'})
    } else {
        try {
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt)
            const user = new User({
                username: req.body.name,
                email: req.body.email,
                password: password
            })
            await user.save()
            return res.status(201).json(user)
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
}

exports.loginUser =  async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Implement JWT token generation or session creation here
        res.status(200).json({ message: 'User logged in successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}