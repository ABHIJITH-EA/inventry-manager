const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    pid: {
        type: Number,
        required: [true, 'Must provide'],
        trim: true,
        maxlength: [20, 'name connot be more than 20 characters']
    },
    number: {
        type: Number,
        required: [true, 'Must provide'],
        trim: true,
        maxlength: [20, 'name connot be more than 20 characters']
    },
    qty: {
        type: Number,
        required: [true, 'Must provide'],
        trim: true,
    }
});

module.exports = mongoose.model('Stock', stockSchema);