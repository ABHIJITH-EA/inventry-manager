const express = require("express")

const router = express.Router()

const {
    getAllWarehouse,
    createWarehouse
} = require("../controllers/warehouse")

router.route('/').get(getAllWarehouse).post(createWarehouse)

module.exports = router