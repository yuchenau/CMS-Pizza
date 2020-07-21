const {productModel, validate } = require('../models/product');


async function getAllProducts(req,res) {
    const products = await productModel.find()
    res.json(products)

}

async function getProduct(req,res) {
    const product = await productModel.findById(req.params.id)
    if(!product) return res.status(404).json('The product not found');
    return res.json(product)
}

async function addProduct(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const {name, price, calorie, avatar} = req.body
    const newProduct = new productModel({
        name,
        price,
        calorie,
        avatar
    })
    const result = await newProduct.save()
    res.json(result)
}

async function updateProduct(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {name, price, calorie, avatar} = req.body;
    const product = await productModel.findByIdAndUpdate(req.params.id, {
        name,
        price,
        calorie,
        avatar
    },{new: true});

    if (!product) {
        return res.status(404).json("Product is not found")
    };

    return res.json(product);
}

async function deleteProduct(req,res) {
    const product = await productModel.findByIdAndDelete(req.params.id)
    if(!product) return res.status(404).json('The Product  not found');
    return res.json(product)
}

async function updateAvatar(req, res) {
    const { id } = req.params;
    const { avatar } = req.body;
    const product = await productModel.findByIdAndUpdate(id, {
        avatar
    });
    if(!product) {
        return res.status(404).json('Image missing'); 
    }

    return res.json(product)
}

module.exports = {
    getProduct,
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    updateAvatar
}