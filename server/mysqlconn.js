var mysql        = require('mysql');
const mysql_host = process.env.MYSQL_HOST;
const mysql_db = process.env.MYSQL_DB || 'v7nosqohyskirint';
const mysql_user = process.env.MYSQL_USER;
const mysql_password = process.env.MYSQL_PASSWORD;


console.log('mysql_host is ', mysql_host);
console.log('mysql_db is ', mysql_db);
var con  = mysql.createConnection({
    supportBigNumbers: true,
    bigNumberStrings: true,
    host: mysql_host,
    user: mysql_user,
    password: mysql_password,
    database : mysql_db
});
module.exports = con;