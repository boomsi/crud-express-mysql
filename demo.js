var express = require('express')
var mysql = require('mysql')

var router = express.Router()
// 1.创建连接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'students' //数据库名
})

// 2.连接数据库	打开冰箱门
connection.connect();

// 3.执行数据操作	把大象放到冰箱

	// connection.query('SELECT * FROM students', function(error, results, fields) {
	//     if (error) throw error
 //    	console.log(results)
	// });

var findAll = function (callback) {
 	connection.query('SELECT * FROM students', function (error, results, fields) {
	  	if (error) {
	  		console.log(error)
			return callback(error)
		}
		console.log(results)
		callback(null , results)
	});
 }

		findAll((err, data) => {
			if (err) {
				return console.log('error')
			}
			console.log(data)
		})


// 4.关闭连接	关闭冰箱门
connection.end()
