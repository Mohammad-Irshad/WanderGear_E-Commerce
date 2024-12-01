const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    addresslineOne : {
        type : String,
        require : true
    },
    addresslineTwo : {
        type : String,
        require : true
    },
    city : {
        type : String,
        require : true
    },
    state : {
        type : String,
        require : true
    },
    zip : {
        type : String,
        require : true
    }
},{timestamps : true})


const Address = mongoose.model('Address', addressSchema)

module.exports = Address