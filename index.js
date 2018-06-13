const express = require('express')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')

mongoose.Promise = global.Promise

let env = process.env.NODE_ENV || 'development'
let port = process.env.PORT || 1337

let app = express()

app.engine('.hbs', handlebars({
  extname: '.hbs',
  layoutsDir: 'views/layouts',
  defaultLayout: 'main'
}))

app.set('view engine', '.hbs')

app.get('/', (req, res) => {
  mongoose.connect('mongodb://localhost:27017/ganerictemplate')
    .then(() => {
      console.log('MongoDb Ready!')

      res.render('index')
    })
})
app.use(express.static('public'))
app.listen(port)
console.log(`Server listening on port ${port}...`)
