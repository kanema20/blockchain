const sql = require('mssql/msnodesqlv8');

//const config = require("./config")

const dbConfig = require('./config');

const connection = new sql.ConnectionPool(dbConfig);

function getConnection() {
    connection.connect(function(err) {
        if (err) {
            console.log("error while connecting to db: " + err);
            setTimeout(getConnection, 2000);
        } else {
            console.log("we in");
        }
    });
    connection.on('error', function(err) {
        if(err.code === "PROTOCOL_CONNECTION_LOST") {
            getConnection();
        } else {
            throw err;
        }
    });
}
//getConnection();

module.exports = {
    connection, 
    getConnection
};
