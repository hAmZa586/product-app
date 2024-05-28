const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const product = require('../models/product');


router.post('/addproduct', async (req,res) =>{
    try {
        const product =  new Product({
            name: req.body.name,
            description : req.body.description,
            price : req.body.price,
            category : req.body.category
        })

        const savedProduct = await product.save();
        res.json(savedProduct)


    } catch (error) {
        res.status(400).json({message: error.message})
    }

})

router.get('/readAllProducts',async (req,res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.put('/updateproduct/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true } // Return the updated document
        )
        res.json(updatedProducts)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/deleteproduct/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

 module.exports = router;