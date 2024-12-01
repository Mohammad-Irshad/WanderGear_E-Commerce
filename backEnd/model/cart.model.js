const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    price : {
        type : Number,
        require : true
    },
    discount : {
      type : Number,
      require : true
    },
    color : {
      type : String,
      require : true
    },
    productDescription : String,
    rating : Number,
    productImageUrl : {
    type : String,
    require : true
    }
}, {timestamps : true});

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart