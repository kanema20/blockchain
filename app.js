const express = require('express');
const app = express();


app.post('/', (req, res) => {
    var email = req.body.email;
    var amount = req.body.amount;

    res.send({"amount": amount, "email": email});
})

app.get('/', (req, res) => {
    res.send('web 2.0');
});


module.exports = app;