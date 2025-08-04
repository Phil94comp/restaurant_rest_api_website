const mongoose = require('mongoose');

//To change the fields in MongoDB go to the command line and paste the cluster string and enter password.
//Use db.(database name).find() to look at the data. 
//Use the updateMany command with {}, { $rename: { "oldField": "newField"}} to rename the field names for the database.
const OrderSchema = new mongoose.Schema({
    tableNumber: {
        type: String,
        required: true
    },
    seatNumber: {
        type: String,
        required: true
    },
    foodOrder: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Orders', OrderSchema);