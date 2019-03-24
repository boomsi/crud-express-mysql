var express = require('express')
var Student = require('./student')
var fs = require('fs')
var url = require('url')

var router = express.Router()

router.get('/', (req, res) => {
    Student.findAll((err, data) => {
        if (err) {
            res.send(err)
            return res.status(500).send('error')
        }
        res.render('index.html', {
            students: data
        })
    })
})

router.get('/new', (req, res) => {
    res.render('new.html')
})

router.post('/new', (req, res) => {
    Student.save(req.body, (err) => {
        if (err) {
            res.status(500).send('err')
        }
    })
    res.redirect('/')
})

router.get('/edit', (req, res) => {
    const id = url.parse(req.url, true).query.id
    Student.findById(id, (err, data) => {
      if (err) {
        res.status(500).send('error')
      }
      res.render('edit.html', {
        student: data[0]
      })
    })
})

router.post('/edit', (req, res) => {
    Student.editById(req.body, (err) => {
      if (err) {
        res.send(err)
        res.status(500).send('err')
      }
      res.redirect('/')
    })
})

router.get('/delete', (req, res) => {
  const id = url.parse(req.url, true).query.id
  Student.deleteById(id, (err) => {
    if (err) {
      res.status(500).send('err')
    }
    res.redirect('/')
  })
})

module.exports = router