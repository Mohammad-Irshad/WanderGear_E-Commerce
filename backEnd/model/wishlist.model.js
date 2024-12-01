const mongoose = require('mongoose')

const wishlistScheme = mongoose.Schema({
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
    productImageUrl : {
        type : String,
        require : true
    }
}, {timestamps : true})


const Wishlist = mongoose.model("Wishlist", wishlistScheme)

module.exports = Wishlist

