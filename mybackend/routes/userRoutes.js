const router = require('express').Router();
const User = require('../models/User');



/**
 * Route: POST /auth/signup
 * Description: Registers a new user
 * Request Body:
 *   - name: String (required) - The name of the user
 *   - email: String (required) - The email address of the user
 *   - password: String (required) - The password of the user
 * Response:
 *   - 200 OK: Returns the created user object
 *   - 400 Bad Request: If the email already exists or if there's a validation error
 */
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(400).send('Email already exists');
        }

        // Check if the password meets complexity requirements
        const passwordError = User.isPasswordValid(password);
        if (passwordError) {
            return res.status(400).send(passwordError);
        }

        // If all checks pass, create the user
        const user = await User.create({ name, email, password });
        res.json(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

/**
 * Route: POST /auth/login
 * Description: Logs in an existing user
 * Request Body:
 *   - email: String (required) - The email address of the user
 *   - password: String (required) - The password of the user
 * Response:
 *   - 200 OK: Returns the logged-in user object
 *   - 400 Bad Request: If the email or password is incorrect
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        res.json(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;
