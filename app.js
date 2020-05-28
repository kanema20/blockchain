const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const dbConnect = require('./db');
var path = require('path');
const {save_user_information, get_list_of_participants} = require('./models/server_db');
const publicPath = path.join(__dirname, './public');
const paypal = require('paypal-rest-sdk');
const session = require('express-session');


//configure express session
app.use(session(
    {secret: 'my web app',
    cookie: {maxAge: 60000}
    }
));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(publicPath));

//paypal sdk configuration
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AQxhAnefmeytC4ugZUBMIvLz33G6YdC8ytzyk9EvgpDmDUMqsAujbhuHvEBSBOpryABpQJrgyy04d2oM',
    'client_secret': 'EDvZBGTsjgdMsSk6Te2ul2zz-g8Vqq5WCNIS4jRSpmsEoWtQcGCKTD9QkrFeggiktC8usj2u3T32_KDD'
  });

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

app.post('/post_info', async (req, res) => {
    var email = req.body.email;
    var amount = req.body.amount;

    if (amount <= 1) {
        return_info = {};
        return_info.error = true;
        return_info.message = "the amount is invalid.";
        return res.send(return_info);
    }
    var fee_amount = amount * 0.9; //save this amount to the session

    if (email == "") {
        //text parsing - regex needed
    }

    var result = await save_user_information({"amount": amount, "email": email});
    req.session.paypal_amount = amount; //total amount before paypal takes fee

    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Lottery",
                    "sku": "Funding",
                    "price": amount,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": amount
            },
            "payee": {
                'email': '' //paypal email account
            },
            "description": "Lottery Purchase"
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            for (var i=0; i< payment.links.length;i++) {
                if (payment.links[i].rel == 'approval_url') {
                    return res.send(payment.links[i].href);
                }
            }
        }
    });

    //res.send(result);
});

app.get('/success', async(req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    var execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": req.session.paypal_amount
            }
        }]
    };
    paypal.execute(paymentId, execute_payment_json, function(err, payment) {
        if (err) {
            console.log(error.response);
            throw error;
        } else {
            console.log(payment);
        }
    });
    res.redirect('http://localhost:3000');
});

app.get('/get_total_amount', async (req, res) => {
    var result = await get_total_amount();
    console.log(result);
    res.send(result);
});

app.get('/pick_winner', async (req, res) => {
//get total amount paid by all participants
    var result = await get_total_amount();
    console.log(result);
    var total_amount = result[0].total_amount;
    req.session.paypal_amount = total_amount;

    /*placeholder for picking the winner ,
    1. write a query to get a list of all participants
    2. pick a winner */

    var list_of_participants = await get_list_of_participants();
    //json parse, stringify, and turn it back into variable
    list_of_participants = JSON.parse(JSON.stringify(list_of_participants));
    var email_array = [];
    list_of_participants.forEach(function (element) {
    console.log(element);
    email_array.push(element.email); //fill up array with all emails
    });
    console.log(email_array);
    var winner = email_array[Math.floor(Math.random()*email_array.length)];
    console.log(winner);
    
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Lottery",
                    "sku": "Funding",
                    "price": req.session.paypal_amount,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": amount
            },
            "payee": {
                'email': winner_email //paypal email account
            },
            "description": "paying winner of lottery app"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            for (var i=0; i< payment.links.length;i++) {
                if (payment.links[i].rel == 'approval_url') {
                    return res.send(payment.links[i].href);
                }
            }
        }
    });
    
});

app.get('/', (req, res) => {
    res.send('web 2.0');
    dbConnect.getConnection();
});


module.exports = app;