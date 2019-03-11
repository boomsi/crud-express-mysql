var mysql = require('mysql')

// 1.创建连接
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'students'//数据库名
})
 
 // 2.连接数据库	打开冰箱门
connection.connect();
 
 // 3.执行数据操作	把大象放到冰箱
exports.findAll = function (callback) {
 	connection.query('SELECT * FROM students', function (error, results, fields) {
	  	if (error) {
			return callback(error)
		}
		callback(null, results)
	});
 }

 exports.findById = function (id, callback) {
 	connection.query(`SELECT * FROM students WHERE students.id = ${ id }`, function (error, results, fields) {
		if (error) {
			return callback(error)
		}
		callback(null, results)
	});
 }

exports.save = function (student, callback) {
	connection.query(`INSERT INTO students VALUES(NULL, '${ student.name }', ${ parseInt(student.gender) }, ${ parseInt(student.age) }, '${ student.hobbies }')`, function (error, results, fields) {
		if (error) {
			return callback(error)
		}
		callback(null)
	});
}

exports.updateById = function (student, callback) {
	connection.query(`UPDATE students SET name = '${ student.name }', gender = ${ student.gender }, age = ${ student.age }, hobbies = '${ student.hobbies }' WHERE id = ${ student.id }`, function (error, results, fields) {
		if (error) {
			return callback(error)
		}
		callback(null)
	});
}

exports.deleteById = function (id, callback) {
	connection.query(`DELETE FROM students WHERE id = ${ id }`, function (error, results, fields) {
		if (error) {
			return callback(error)
		}
		callback(null)
	});
}

 // 4.关闭连接	关闭冰箱门
// connection.end();