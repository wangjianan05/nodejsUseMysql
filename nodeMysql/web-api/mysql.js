/*
 * @Author: your name
 * @Date: 2020-01-10 15:29:27
 * @LastEditTime : 2020-01-10 16:27:52
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
 

// var  addSql = 'INSERT INTO user(Id,username,userage) VALUES(2,?,?)';
// var  addSqlParams = ['mary', '22'];

// connection.query(addSql,addSqlParams,function (err, result) {  //增
//         if(err){
//          console.log('[INSERT ERROR] - ',err.message);
//          return;
//         }        
 
//        console.log('--------------------------INSERT----------------------------');
//        //console.log('INSERT ID:',result.insertId);        
//        console.log('INSERT ID:',result);        
//        console.log('-----------------------------------------------------------------\n\n');  
// });

// var modSql = 'UPDATE user SET username = ?,userage = ? WHERE Id = ?';
// var modSqlParams = ['wangjn', '18',1];
//改
// connection.query(modSql,modSqlParams,function (err, result) {
//    if(err){
//          console.log('[UPDATE ERROR] - ',err.message);
//          return;
//    }        
//   console.log('--------------------------UPDATE----------------------------');
//   console.log('UPDATE affectedRows',result);
//   console.log('-----------------------------------------------------------------\n\n');
// });
// var delSql = 'DELETE FROM user where id=2';
//删
// connection.query(delSql,function (err, result) {
//         if(err){
//           console.log('[DELETE ERROR] - ',err.message);
//           return;
//         }        
 
//        console.log('--------------------------DELETE----------------------------');
//        console.log('DELETE affectedRows',result);
//        console.log('-----------------------------------------------------------------\n\n');  
// });
module.exports = connection;