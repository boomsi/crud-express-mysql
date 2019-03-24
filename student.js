var fs = require('fs')

var mysql = require('mysql');

// 1.创建连接
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'students'//数据库名
});

// 2.连接数据库	打开冰箱门
connection.connect();

exports.findAll = function (callback) {
  connection.query('SELECT * FROM students', function (error, results, fields) {
    if (error) {
      return callback(error)
    }
    callback(null, results)
  });
}

exports.findById = function (id, callback) {
  connection.query(`SELECT * FROM students WHERE id=${id}`, function (error, results, fields) {
    if (error) {
      return callback(error)
    }
    callback(null, results)
  });
}

exports.save = function (student, callback) {
  connection.query(`INSERT INTO students VALUES(null , '${student.name}', ${student.gender}, ${student.age}, '${student.hobbies}')`, function (error, results, fields) {
    if (error) {
      return callback(error)
    }
    callback(null)
  });
}

exports.editById = function (student, callback) {
  connection.query(`UPDATE students SET name='${student.name}', age=${student.age}, gender=${student.gender}, hobbies='${student.hobbies}' WHERE id=${student.id}`, function (error, results, fields) {
    if (error) {
      return callback(error)
    }
    callback(null)
  });
}

exports.deleteById = function (id, callback) {
  connection.query(`DELETE FROM students WHERE id = ${id}`, function (error, results, fields) {
      if (error) {
        return callback(error)
      }
      callback(null)
  });
}

// 4.关闭连接	关闭冰箱门
// connection.end();