var Connection = require('tedious').Connection;
var Request = require('tedious').Request
const app = require('../server');


const config = require('./config.json')
var connection = new Connection(config)

connection.on('connect', function(err){
    if (err){
        console.log(err);
    } else {
        console.log("connected");
        const response = executeSQL();
        console.log(response)
    }
});

connection.connect()


function executeSQL(){
    request = new Request("SELECT * FROM ProgEksamen.Users", function(err){
    if (err){
        console.log(err)}})

    connection.execSql(request)
    var counter = 1
    response = {}
    request.on('row', function(columns){
        response[counter] = {}
        columns.forEach(function(column){
            response[counter][column.metadata.colName] = column.value
        });
        counter += 1
    });
    return response
};


app.get('/users', (req, res) => {
    sqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
        if (err) 
            res.send(rows);
            else
            console.log(err);     
    })
});