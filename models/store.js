const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide'],
        trim: true,
        maxlength: [20, 'name connot be more than 20 characters']
    },
    id: {
        type: Number,
        required: [true, 'Must provide'],
        trim: true,
    }
});

module.exports = mongoose.model('Product', productSchema);