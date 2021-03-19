require('dotenv').config()

const express = require('express')
const path = require('path')
const hbs = require('hbs')
const sessions = require('express-session')
const MongoStore = require('connect-mongo')
const morgan = require('morgan')

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
hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'))
app.use(morgan('dev'))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.use(sessions({
  name: app.get('cookieName'),
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: dbConnectionURL,
  }),
  cookie: {
    // secure: true,
    httpOnly: true,
    maxAge: 86400 * 1e3,
  },
}))

app.use((req, res, next) => {
  res.locals.emailLocals = req.session?.emailSession;
  if (req.session?.roleSession === 0) {
    res.locals.roleLocals = 'admin';
  };
  next();
});

app.use('/', pageRouter);
app.use('/users/', userRouter);
//Mid for routes here
app.use('/admin', adminRouter)

// app.use(async (req, res, next) => {
//   const userId = req.session?.user?.id
//   if (userId) {
//     const currentUser = await User.findById(userId)
//     req.userRole = currentUser.role
//     if (req.userRole === 0) {
//       res.locals.email = currentUser.email
//       return next()
//     }
//   }
//   next()
// })

app.listen(PORT, () => {
  console.log('Server started on port ', PORT)
})

module.exports = app;
