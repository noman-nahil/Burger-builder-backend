const express = require('express');
const { Order } = require('../models/order');
const router = express.Router();
const authorize = require('../middleware/authorize')

const newOrder = async (req, res) => {
    const order = new Order(req.body);
    try {
        await order.save();
        return res.status(201).send("Order place successfully");
    }
    catch {
        return res.status(400).send("Sorry! Something went wrong");
    }

}


router.route('/')
    .get()
    .post(authorize, newOrder)

module.exports = router;