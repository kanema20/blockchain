const db = require('../db');



save_user_information = (data) => new Promise((resolve, reject) => {
    db.query('INSERT INTO [blockchain_db].[dbo].[lottery_information] SET ?', data, function (err, results, fields) {
        if (err) {
            reject("could not insert into lottery information");
        } else {
            resolve('successful');
        }
    });

})

get_total_amount = (data) => new Promise((resolve, reject) => {
    db.query('SELECT SUM(amount) as total_amount from [blockchain_db].[dbo].[lottery_information]',null, function (err, results, fields) {
        if (err) {
            reject("could not get total amount");
        } else {
            resolve('successful');
        }
    });

})

module.exports = {
    save_user_information, get_total_amount
};