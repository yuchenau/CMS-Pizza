const { cartModel } = require('../models/cart');
const { orderModel } = require('../models/order');
const { productModel } = require('../models/product');

async function getCart(req, res) {
    const cart = await cartModel.findById(req.params.id).populate("user", "-password -__v")
                                                        .populate({
                                                            path: 'orders',
                                                            populate: {
                                                                path: 'productId'
                                                            }
                                                        })
    if(!cart) return res.status(404).json('Your Cart is not found');
    return res.json(cart)
}

async function addCart(req, res) {
    const { user } = req.body
    const newCart = new cartModel({
        user
    })
    const result = await newCart.save()
    res.json(result)
}

async function addOrder(req, res) {
    const cart = await cartModel.findById(req.params.id);
    if(!cart) return res.status(404).json('Your Cart is not found');
    const { quantity, productId} = req.body;
    const product = await productModel.findById(productId)
    if(!product) return res.status(404).json('The Product is not found');
    //calculate total price of order
    const totalPrice = Number(product.price * quantity).toFixed(2);
    if(!totalPrice) return res.status(404).json('Cannot calculate the price');
    const newOrder = new orderModel({
        quantity,
        productId,
        totalPrice
    });

    // add order to cart
    cart.orders.push(newOrder);

    //calculate total price of all orders
    cart.totalPrice += Number(totalPrice)
    cart.save();
    return res.json(newOrder)
}

async function removeOrder(req, res) {
    // find cart and order
    const { id, orderId } = req.params 
    const cart = await cartModel.findById(id);
    const order = cart.orders.id(orderId);
    if(!order || !cart ) return res.status(404).json('Cart or Order is not found');

    //calculate total price of all orders 
    const cartTotalPrice = cart.totalPrice - Number(order.totalPrice)
    cart.totalPrice =  Number(cartTotalPrice ).toFixed(2)

    //empty price
    if (cart.totalPrice < 0 || cart.orders.length == 0) {
        cart.totalPrice = 0
    };
    order.remove();
    cart.save();
    return res.json(order)
}

async function emptyOrders(req, res) {
    const cart = await cartModel.findById(req.params.id);
    if(!cart) return res.status(404).json('User cart not found')
    cart.orders = undefined;
    cart.totalPrice = 0;
    cart.save()
    res.json(cart)
}


module.exports = {
    getCart,
    addCart,
    addOrder,
    removeOrder,
    emptyOrders,
}