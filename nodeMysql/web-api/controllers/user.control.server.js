/*
 * @Author: your name
 * @Date: 2020-01-09 15:12:05
 * @LastEditTime: 2020-03-25 08:58:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web-api\control\user.control.server.js
 */
var express = require('express')
var app = express();
const uuidv1 = require('uuid/v1');
const cors = require("cors");
const crypto = require("crypto"); //node自带的密码加密
var nodeExcel = require("excel-export");//首先，引入excel模块：
// const { get } = require("axios").default; //利用axois发送个网络请求
app.use(cors()); //就这一步就已经解决了跨域
var connection = require('../mysql');
module.exports = {
  list:app.get('/userList', (req,res)=>{
    var start = (req.query.pageNum-1)*req.query.pageSize
    var end = req.query.pageNum*req.query.pageSize
    new Promise(function(resolve, reject){
      connection.query(`select count(id) from user where username like '%${req.query.name}%'`, function (error, results, fields) { //查列表
        if (error) throw error;
        var total = results[0][`count(id)`]
        resolve(total)
      });
    }).then((data)=>{
      connection.query(`SELECT * FROM user where username like '%${req.query.name}%' LIMIT ${start},${end}`, function (error, results, fields) { //查列表
      if (error) throw error;
        res.json({
          code:'0',
          data:results,
          total:data,
          msg:''
        });
      });
    })
    
  }),
  detail:app.get('/userList/:id', (req,res)=>{
    let id = req.params.id
    connection.query('SELECT * FROM user where id = "' + id +'"', function (error, results, fields) { //查详情
      if (error) throw error;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      res.json({
        code:'0',
        data:results,
        msg:''
      });
    });
    
  }),
  create:app.post('/userList', (req,res)=>{
    connection.query('SELECT username FROM user where username = ? ',[req.body.username], function (error, results, fields) { //查列表
      if (error) throw error;
      if(results.length>0){
        res.json({
          code:'10010',
          data:[],
          msg:'用户名已存在'
        });
        return;
      } else {
        var  addSql = 'INSERT INTO user(Id,username,userage,password) VALUES(?,?,?,?)';
        var id = uuidv1();
        if(!req.body.userage){
          req.body.userage = null
        }
        let md5 = crypto.createHash("md5");
        let newPas = md5.update(req.body.password).digest("hex");
        var  addSqlParams = [id, req.body.username, req.body.userage, newPas];
        connection.query(addSql,addSqlParams,function (err, result) {  //增
          if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
          }        
          res.json({
            code:'0',
            data:'',
            msg:'成功'
          });
        });
      }
    });
  }),
  edit:app.put('/userList', (req,res)=>{
    var modSql = 'UPDATE user SET username = ?,userage = ? WHERE Id = ?';
    var modSqlParams = [req.body.username, req.body.userage, req.body.id];
    console.log(modSqlParams)
    connection.query(modSql,modSqlParams,function (err, result) {
      if(err){
        console.log('[UPDATE ERROR] - ',err.message);
        return;
      }        
      console.log('--------------------------UPDATE----------------------------');
      console.log('UPDATE affectedRows',result);
      res.json({
        code:'0',
        data:'',
        msg:'成功'
      });
      console.log('-----------------------------------------------------------------\n\n');
    });
    
  }),
  delete:app.delete('/userList', (req,res)=>{
    var delSql = 'DELETE FROM user where id= ?';
    connection.query(delSql,[req.body[0]], function (err, result) {
      if(err){
        console.log('[DELETE ERROR] - ',err.message);
        return;
      }        
      console.log('--------------------------DELETE----------------------------');
      console.log('DELETE affectedRows',result);
      res.json({
        code:'0',
        data:'',
        msg:'成功'
      });
      console.log('-----------------------------------------------------------------\n\n');  
    });
  }),
  login:app.post('/user/login', (req,res)=>{
    let name = req.body.username;
    let password = req.body.password;
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");
    connection.query('SELECT * FROM user where username = ? ',[name], function (error, results, fields) { //查列表
      if (error) throw error;
      console.log(results)
      if(results.length === 0){
        res.json({
          code:'10020',
          data:[],
          msg:'用户不存在'
        });
        return;
      } 
      else if(results[0].password !== newPas){
        res.json({
          code:'10030',
          data:[],
          msg:'密码错误'
        });
        return;
      } else if(results[0].password === newPas){
        res.json({
          code:'0',
          data:[],
          msg:'登录成功'
        });
        return;
      } else {
        res.json({
          code:'999',
          data:[],
          msg:'未知错误'
        });
        return;
      }
    });
  }),
  download:app.get('/download', (req,res)=>{
    var delSql = 'DELETE FROM user where id= ?';
    connection.query(delSql,[req.body[0]], function (err, result) {
      if(err){
        console.log('[DELETE ERROR] - ',err.message);
        return;
      }        
      var conf ={};
      conf.name = "mysheet";
      conf.cols = [{
      caption:'string',
          type:'string',
    },{
      caption:'date',
      type:'date',
    },{
      caption:'bool',
      type:'bool'
    },{
      caption:'number',
       type:'number'				
      }];
      conf.rows = [
       ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
       ["e", new Date(2012, 4, 1), false, 2.7182],
          ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
          ["null date", null, true, 1.414]  
      ];
      var result = nodeExcel.execute(conf);
      res.header('Access-Control-Expose-Headers', 'Content-Disposition');
      res.setHeader('Content-Type', 'application/vnd.ms-excel;charset=UTF-8');
      res.setHeader('Content-Disposition', 'attachment; filename=aaa.xlsx');
      // headers.add("Access-Control-Expose-Headers", "Content-Disposition");
      
      res.end(result, 'binary');
    });
  }),
}