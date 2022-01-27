const express = require('express')
const router = express.Router()

const {
    getAllStock,
    createStock,
    updateStock,
} = require('../controllers/stock')

router.route('/').get(getAllStock).post(createStock)
router.route('/:id/:name').patch(updateStock)

module.exports = router
