var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')
var path = require('path')

var app = express()

app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public/', express.static(path.join(__dirname, '/public/')))
app.use('/node_modules/', express.static(path.join(__dirname, '/node_modules/')))

app.use(router)

app.listen(3000, () => {
	console.log('running...')
})
