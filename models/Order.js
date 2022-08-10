const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    foodOrder: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Orders', OrderSchema);