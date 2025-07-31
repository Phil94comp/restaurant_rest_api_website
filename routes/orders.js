const express = require('express');
const router = express.Router();
const Order = require('./../models/Order');

//Returns all the orders
router.get('/new', async (req, res) => {
    res.render('orders/new', {order: new Order()});
});

//Goes to the edit page of the website
router.get('/edit/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.render('orders/edit', {order: order});
});

//Specific Order
router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order == null) {
        res.redirect('/');
    }
    res.render('orders/show', {order: order});
});

//Submits an order
router.post('/', async (req, res, next) => {
    req.order = new Order();
    next();
}, saveOrderAndRedirect('new'));

//Updates the order
router.put('/:id', async (req, res, next) => {
    req.order = await Order.findById(req.params.id);
    next();
}, saveOrderAndRedirect('edit'));


//Deletes an order
router.delete('/:id', async (req,res) => {
    await Order.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

function saveOrderAndRedirect(path) {
    return async (req, res) => {
        let order = req.order;
        order.firstName = req.body.firstName;
        order.tableNumber = req.body.tableNumber;
        order.foodOrder = req.body.foodOrder;
        
        try{
            const savedOrder = await order.save();
            res.redirect(`/orders/${savedOrder.id}`);
        }catch(error) {
            res.render(`orders/${path}`, {order: order});
        }
    }
}

module.exports = router;