var fs = require('fs')

var dbPath = './db.json'

// 查找全部学生
exports.findAll = function (callback) {
	fs.readFile(dbPath, 'utf8', (err, data) => {
		if (err) {
			callback(err)
		}
		return callback(null, JSON.parse(data).students)
		// console.log(JSON.parse(data).students)
	})
}

// 根据id查找学生信息
exports.findById = function (id, callback) {
	fs.readFile(dbPath, 'utf8', (err, data) => {
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		var ret = students.find((item) => {
			return item.id === id
		})
		callback(null, ret)
	})
}

// 保存添加学生信息
exports.save = function (student, callback) {
	fs.readFile(dbPath, 'utf8', (err, data) => {
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		student.id = parseInt(students[0].id) + 1
		students.unshift(student)
		console.log(student)
		var fileData = JSON.stringify({
			students: students
		})
		fs.writeFile(dbPath, fileData, (err)=> {
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})
}

// 更新学生信息
exports.updateById = function (student, callback) {
	fs.readFile(dbPath, 'utf8', (err, data) => {
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		student.id = parseInt(student.id)

		var ret = students.find((item) => {
			return student.id === item.id
		})
		for (var key in student) {
			ret[key] = student[key]
		}
		var fileData = JSON.stringify({
			students: students
		})
		fs.writeFile(dbPath, fileData, (err) => {
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})
}

// 删除学生信息
exports.deleteById = function (id, callback) {
	fs.readFile(dbPath, 'utf8', (err, data) => {
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		var ret = students.findIndex((item) => {
			return item.id === parseInt(id)
		})
		students.splice(ret, 1)
		var fileData = JSON.stringify({
			students: students
		})
		fs.writeFile(dbPath, fileData, (err) => {
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})
}