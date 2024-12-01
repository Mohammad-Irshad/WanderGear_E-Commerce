const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = process.env.MONGODBURL

const initializeDatabase = async () => {
  try{
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser : true,
      useUnifiedTopology : true
    })
    if(connection){
      console.log("Connected Successfully")
    }
  }catch(error){
    console.log("Connection failed : ", error)
  }
}

module.exports = {initializeDatabase}