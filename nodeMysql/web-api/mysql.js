/*
 * @Author: your name
 * @Date: 2020-01-10 15:29:27
 * @LastEditTime : 2020-01-15 16:56:40
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web-api\model\mysql.js
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',  
  database : 'cms_demo'
});
 
connection.connect();
module.exports = connection;