const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name : {
    type : String,
    required : true
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
  categoryName : {
    type : String,
    enum : ["Travel Bags and Luggage", "Travel Accessories", "Electronics and Gadgets", "Outdoor and Adventure Gear"],
    required : true
  },
  productDescription : String,
  wishList : Boolean,
  cart : Boolean,
  rating : Number,
  productImageUrl : {
    type : String,
    require : true
  }
}, {timestamps : true})

const Products = mongoose.model('Products', productSchema)

module.exports = Products