const {customerModel, validate } = require('../models/customer');
const { cartModel } = require('../models/cart');
const { generateToken } = require('../utils/jwt');



async function getCustomer (req, res) {
    const customer = await customerModel.findById(req.user.id).select('-password').populate({
                                                                                        path: 'userCart',
                                                                                        populate: {
                                                                                            path: 'orders',
                                                                                            populate: {
                                                                                                path: 'productId'
                                                                                            }
                                                                                        }
                                                                                    })

    res.send(customer)
}


async function addCustomer (req, res) {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const { name, username, password, address } = req.body

    const existingCustomer = await customerModel.findOne({ username })
    if (existingCustomer) return res.status(400).json('Username already exist')
    
    customer = new customerModel({
        name, 
        username, 
        password, 
        address
    })
    await customer.hashPassword();
    await customer.save()

    //create user cart
    const userId = customer._id
    const newCart = new cartModel({
        user: userId
    })
    await newCart.save()

    //ref user cart to user
    customer.userCart = newCart._id;
    await customer.save()

    const token = generateToken( customer._id );
    return res.status(201).json({token, name, username, address} );
}

async function deleteCustomer(req, res) {
    const customer = await customerModel.findById(req.params.id);
    if (!customer) return res.status(400).json('Customer not exsit');
    const userCartId = customer.userCart
    await cartModel.findByIdAndDelete(userCartId)
    await customerModel.findByIdAndDelete(req.params.id)
    return res.json(customer)
}


module.exports = {
   addCustomer,
   getCustomer,
   deleteCustomer
}
