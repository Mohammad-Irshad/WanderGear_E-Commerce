const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  categoryName : {
    type : String,
    enum : ["Travel Bags and Luggage", "Travel Accessories", "Electronics and Gadgets", "Outdoor and Adventure Gear"],
    required : true
  },
  categoryDescription : String,
  categoryImageUrl : String
}, {timestamps : true})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category