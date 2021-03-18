require('dotenv').config()

const options = {
  useNewUrlParser: true, 
  useFindAndModify: false, 
  useCreateIndex: true, 
  useUnifiedTopology: true, 
  poolSize: 10, 
  bufferMaxEntries: 0, 
  
}

const { DB_HOST, DB_NAME, DB_PORT, mongoDBurl } = process.env

const dbConnectionURL =
  process.env.NODE_ENV === 'production' ? mongoDBurl : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

const serverURL = 'http://localhost:3000'

module.exports = {
  dbConnectionURL,
  options,
  serverURL,
}
