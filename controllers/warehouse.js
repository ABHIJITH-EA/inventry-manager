const Warehouse = require("../models/warehouse")

const getAllWarehouse = async (req, res)=>{
    try {
        const warehouse = await Warehouse.find()
        res.status(201).json({warehouse})
    } catch(err) {
        res.status(500).json(err)
    }
}

const createWarehouse = async (req, res)=> {
    try {
        const {wareHouseNumber, limit } = req.body
        console.log(req.body)
        const warehouse = await Warehouse.create({number: wareHouseNumber, limit })
        res.status(201).json({warehouse})
    } catch(err) {
        res.status(500).json(err)
    }
}

module.exports = {
    getAllWarehouse,
    createWarehouse
}