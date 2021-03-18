require('dotenv').config()

const express = require('express')
const path = require('path')
const hbs = require('hbs')
const sessions = require('express-session')
const MongoStore = require('connect-mongo') 

const userRouter = require('./routes/users')
const pageRouter = require('./routes/pages')
const adminRouter = require('./routes/admin')

const dbConnect = require('./config/dbConnect')
const { dbConnectionURL } = require('./config/dbConfig')
const User = require('./db/models/User')

const app = express()
const PORT = process.env.PORT || 3000
const secretKey = process.env.SECRETKEY
dbConnect()

app.set('trust proxy', 1) 
app.set('view engine', 'hbs')
app.set('cookieName', 'sid')
app.set('views', path.join(process.env.PWD, 'views'))
hbs.registerPartials(path.join(process.env.PWD,'views', 'partials'))

app.use(sessions({
  name: app.get('cookieName'),
  secret: secretKey,
  resave: false, 
  saveUninitialized: false, 
  store: MongoStore.create({ 
  mongoUrl: dbConnectionURL,
  }),
  cookie: { 
    secure: true,
    httpOnly: true, 
    maxAge: 86400 * 1e3, 
  },
}))

//app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Mid for routes here
app.use('/admin', adminRouter)

app.listen(PORT, () => {
  console.log('Server started on port ', PORT)
})
