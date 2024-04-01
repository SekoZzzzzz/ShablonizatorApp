require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const path = require('path')
const errorHandler = require('./middlewares/errorhandlingmiddleware')
const PORT = process.env.PORT || 5500
const app = express()
const router = require('./routes/index')
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)
const start = async () =>{
  try{
    await sequelize.authenticate()
    await sequelize.sync()
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch(e){
    console.log(e)
  }
}
start()