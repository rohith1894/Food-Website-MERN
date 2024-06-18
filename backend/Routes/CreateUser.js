const express = require('express');
const router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecret = "$###MyNameIsRohithReddyAdapa###$";


router.post('/createuser', expressAsyncHandler(async (request, response) => {
    let username = request.body.username;
    let userData = await User.findOne({ username });
    if (!userData) {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(request.body.password, salt);
        await User.create({
            username: request.body.username,
            password: hashedPassword,
            email: request.body.email,
        });
        return response.json({ success: true });
    }
    else {
        return response.json({ success: false, message: "Username already Exist" });
    }
}));

router.post('/loginuser', expressAsyncHandler(async (request, response) => {
    let username = request.body.username;
    let userData = await User.findOne({ username });
    if (!userData) {
        return response.json({ success: false, message: "Invalid Credentials" });
    }
    let isEqual = await bcryptjs.compare(request.body.password, userData.password);
    if (isEqual===false) {
        return response.json({ success: false, message: "Invalid Credentials" });
    }
    const data = {
        user: {
            id:userData.id
        }
    }
    const authToken = jwt.sign(data, jwtSecret);
    return response.json({ success: true, authToken: authToken });
}));

module.exports = router;
