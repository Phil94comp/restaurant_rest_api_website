const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Order = require('./models/Order');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

app.set('view engine', 'ejs');

//Import Routes
const ordersRoute = require('./routes/orders');

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));

//Route
app.get('/', async (req, res) => {   
    const orders = await Order.find().sort({firstName: 'desc'});
    res.render('orders/index', {orders: orders});
});

app.use('/orders', ordersRoute);

//Connect to database
mongoose.connect(process.env.DB_Connection, () => 
console.log('Connected to DB!'));

app.listen(3000);