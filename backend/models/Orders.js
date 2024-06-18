const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model('Order', OrderSchema);
