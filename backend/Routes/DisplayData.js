const express = require('express');
const router = express.Router();
const expressAsyncHandler = require('express-async-handler');
router.post('/foodData', expressAsyncHandler(async (request, response) => {
    response.send([global.food_items,global.foodCategory]);
}))
module.exports = router;