const Stock = require("../models/stock")

const getAllStock = async (req, res)=>{
    try {
        const stock = await Stock.find()
        res.status(201).json({stock})
    } catch(err) {
        res.status(500).json(err)
    }
}

const createStock = async (req, res)=> {
    try {
        const {pid, number, qty: updateQty } = req.body
        const updateStatus = await Stock.findOne({pid, number})
        if(!updateStatus) {
            console.log(updateQty)
            const stock = await Stock.create(req.body)
            res.status(201).json({"Status": "Success", "Message": "Stock added"})
        } else {
            const {qty: currentQty} = updateStatus
            await Stock.findOneAndUpdate({pid, number}, {qty: (currentQty + updateQty)})
            res.status(201).json({"Status": "Success", "Message": "Stock updated"})
        }
    } catch(err) {
        res.status(500).json(err)
    }
}

// const deleteStock = async (pid, name)=> {
//     try {
//         // json({"status": "success", "message": "Stock finished"})
//         console.log(req.params) 
//         const {id: pid, name} = req.params
//         const stock = await Stock.findOneAndDelete({pid, name})
//         res.status(201).json(stock)
//     } catch(err) {
//         res.status(500).json(err)
//     }
// }

const updateStock = async (req, res)=> {
    try {
        const {id: pid, name:number, qty: unstockQty} = req.body
        const {qty: currentQty} = await Stock.findOne({pid, number})
        if (currentQty < unstockQty) {
            res.status(500).json({"status": "success", "message": "That much stock not availbale"})
            return
        }
        const stock = await Stock.findOneAndUpdate({pid, number}, {qty: (currentQty - unstockQty)})
        if ((currentQty - unstockQty) == 0) {
            await Stock.findOneAndDelete({pid, number})
            res.status(201).json({"status": "success", "message": "Stock finished"})
            return
        }
        res.status(200).json({"status": "success", "message": `current stock ${currentQty - unstockQty}`})
    } catch(err) {
        res.status(500).json(err)
    }
}

module.exports = {
    getAllStock,
    createStock,
    updateStock,
}