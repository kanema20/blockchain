const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const dbConnect = require('./db');
const {save_user_information} = require('./models/server_db');
const publicPath = path.join(__dirname, './public');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(publicPath));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //* = access to all origins
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
     //what kind of headers we want to accept 
     if (req.method === "OPTIONS") {
         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
         return res.status(200).json({});
     }
     next();
}); //postman is just a testing service

app.post('/', async (req, res) => {
    var email = req.body.email;
    var amount = req.body.amount;

    if (amount <= 1) {
        return_info = {};
        return_info.error = true;
        return_info.message = "the amount is invalid.";
        return res.send(return_info);
    }

    if (email == "") {
        //text parsing - regex needed
    }

    var result = await save_user_information({"amount": amount, "email": email});

    res.send(result);
});

app.get('/get_total_amount', async (req, res) => {
    var result = await get_total_amount();
    console.log(result);
    res.send(result);
});

app.get('/', (req, res) => {
    res.send('web 2.0');
    dbConnect.getConnection();
});


module.exports = app;