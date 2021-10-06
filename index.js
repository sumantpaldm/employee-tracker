const inquirer = require("inquirer");
const sql = require("mysql2");
const table = require("console.table");
const fs = require("fs");




var connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'emptracker',
    password: 'Waheguru@58!'
});





