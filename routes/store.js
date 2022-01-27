const express = require('express')
const router = express.Router()

const {
    getAllProducts,
    createProduct,
    deleteProduct
} = require('../controllers/product')

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').delete(deleteProduct)

module.exports = router
