var fs = require('fs')
var express = require('express')
var Student = require('./student')

var router = express.Router()

// 首页
router.get('/students', (req, res) => {
	Student.findAll((err, students) => {
		if (err) {
			return res.status(500).send('Server error')
		}
		res.render('index.html', {
			students: students,
			arr: [
				'苹果',
				'香蕉',
				'橘子',
				'草莓'
			]
		})
	})
})

// 添加学生
router.get('/students/new', (req, res) => {
	res.render('new.html')
})

// 提交添加数据
router.post('/students/new', (req, res) => {
	Student.save(req.body, (err) => {
		if (err) {
			return res.status(500).send('Server error')
		}
		res.redirect('/students')
	})
})

// 编辑学生信息
router.get('/students/edit', (req, res) => {
	Student.findById(parseInt(req.query.id), (err, student) => {
		if (err) {
			return res.status(500).send('Server error')
		}
		res.render('edit.html', {
			student: student
		})
	})
})

// 提交编辑学生信息
router.post('/students/edit', (req, res) => {
	Student.updateById(req.body, (err) => {
		if (err) {
			return res.status(500).send('Server error')
		}
		res.redirect('/students')
	})
})

// 删除学生
router.get('/students/delete', (req, res) => {
	Student.deleteById(req.query.id, (err) => {
		if (err) {
			return res.status(500).send('Server error')
		}
		res.redirect('/students')
	})
})


module.exports = router
