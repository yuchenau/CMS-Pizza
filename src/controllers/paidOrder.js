const { paidOrderModel, validate } = require('../models/paidOrder');

async function updateOrderStatus(req,res) {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const { status } = req.body;
    const order = await paidOrderModel.findByIdAndUpdate(req.params.id, {
        status,
    },{new: true});

    if (!order) {
        return res.status(404).json("Order is not found")
    };

    return res.json(order);
}

module.exports = {
    updateOrderStatus,
  }