const Product = require("../models/store");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(201).json({products})
    } catch(err) {
        res.status(500).json({msg: err})
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json(product)
    } catch(err) {
        res.status(500).json({msg: err})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id: productID } = req.params
    const product = await Product.findOneAndDelete({ _id: productID })
    if (!product) {
      res.status(404).send(`No product with id : ${productID}`)
      return null
    }
    res.status(200).json({ product })
    } catch(err) {
        res.status(500).json({msg: err})
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct
}