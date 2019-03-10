var express = require('express')
var fs = require('fs')
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()

//配置body-parser来在express中获取POST请求数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//配置模板引擎
app.engine('html', require('express-art-template'))

//打开公共资源文件夹
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.use(router)

app.listen(3000, () => {
	console.log('running...')
})

