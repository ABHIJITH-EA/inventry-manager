const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: [true, 'Must provide'],
        trim: true,
        maxlength: [20, 'name connot be more than 20 characters']
    },
    limit: {
        type: Number,
        trim: true,
    }
});

module.exports = mongoose.model('Warehouse', warehouseSchema);