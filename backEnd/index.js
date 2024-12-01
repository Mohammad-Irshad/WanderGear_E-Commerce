const express = require('express')
const {initializeDatabase} = require('./db/db')
const Products = require('./model/products.model')
const Category = require('./model/category.model')
const Address = require('./model/address.model')
const Cart = require('./model/cart.model')
const Wishlist = require('./model/wishlist.model')

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express()

app.use(express.json())
app.use(cors(corsOptions));

initializeDatabase()


// Function to post data in backend

// Post categories data

// const data = [
//   {categoryName : "Travel Bags and Luggage", categoryDescription : "Discover essential travel accessories designed to make your journey comfortable, convenient, and stylish.", categoryImageUrl : "https://images.unsplash.com/photo-1639598003276-8a70fcaaad6c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},

//   {categoryName : "Travel Accessories", categoryDescription : "Enhance your adventures with premium quality travel accessories for every traveler.", categoryImageUrl : "https://cdn.pixabay.com/photo/2017/10/23/05/56/summer-2880261_640.jpg"},

//   {categoryName : "Electronics and Gadgets", categoryDescription : "Stay connected and powered up with electronics and gadgets designed for seamless travel.", categoryImageUrl : "https://cdn.pixabay.com/photo/2020/08/26/14/29/technology-5519649_640.jpg"},

//   {categoryName : "Outdoor and Adventure Gear", categoryDescription : "Gear up with outdoor gear built to withstand the elements and enhance your experience.", categoryImageUrl : "https://images.unsplash.com/photo-1625013964767-0e4b3c041607?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FtcGluZyUyMGdlYXJ8ZW58MHx8MHx8fDA%3D"}  
// ]

const newCategory = {categoryName : "Outdoor and Adventure Gear", categoryDescription : "Gear up with outdoor gear built to withstand the elements and enhance your experience.", categoryImageUrl : "https://images.unsplash.com/photo-1625013964767-0e4b3c041607?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FtcGluZyUyMGdlYXJ8ZW58MHx8MHx8fDA%3D"}

async function addCategories(newCategory){
  try{
    const category = new Category(newCategory)
    const saveCategory = await category.save()    
      console.log("Data added successfully.",  saveCategory)    
  }catch(error){
    console.log("Getting an error : ", error)
  }
}

// addCategories(newCategory)


const newProduct = {
  name : "Climbing Rope",
  price : 1199,
  discount : 15,
  color : 'Blue',
  categoryName : 'Outdoor and Adventure Gear',
  productDescription : "Elevate your climbing experience with our dependable climbing rope, engineered for safety and performance on every ascent.",
  wishList : false,
  cart : false,
  rating : 2.5,
  productImageUrl : "https://m.media-amazon.com/images/I/711mFaYg1PL._AC_UF894,1000_QL80_.jpg"
}

async function addProduct(newProduct){
  try{
    const product = new Products(newProduct)
    const saveProduct = await product.save()
    console.log("Product saved successfully : ", saveProduct)
  }catch(error){
    console.log("Can't save the product", error)
  }
}


app.get('/', async (req, res) => {
    try{
      res.send("Welcome to Mr. Mohammad Irshad Khan's Server")
    }catch(error){
      req.status(500).json({error : "Can't connect to the server."})
    }
})

// addProduct(newProduct)

// 1. Functionality: This API call gets all products from the db.

async function getAllProducts(){
  try{
    const products = await Products.find()
    return products
  }catch(error){
    console.log("error")
  }
}


app.get('/products', async (req, res) => {
  try{
    const allProducts = await getAllProducts()
    if(allProducts.length > 0){
      res.json(allProducts)
    }else{
      res.status(404).json({error : "No products found!"})
    }
  }catch(error){
    req.status(500).json({error : "Failed to fetch the products from database."})
  }
})

// 2. Functionality: This API call gets product by productId from the db.

async function getProductById(productId){
  try{
    const product = await Products.findById(productId)
    return product
  }catch(error){
    console.log(error)
  }
}

app.get('/products/:productId', async (req, res) => {
  try{
    const product = await getProductById(req.params.productId)
    if(product){
      res.json(product)
    }else{
      res.status(404).json({message : "No product found!"})
    }
  }catch(error){
    res.status(500).json({error : "Failed to fetch the product data."})
  }
})


// 3. This API call updated the product using productId

async function updateProductById(productId, updatedData){
  try{
    const product = await Products.findByIdAndUpdate(productId, updatedData, {new : true})
    return product
  }catch(error){
    console.log(error)
  }
}

app.put("/products/update/:productId", async (req, res) => {
  try{
    const updatedProduct = await updateProductById(req.params.productId, req.body)
    if(updatedProduct){
      res.json({message : "Product updated successfully.", updatedProduct})
    }else{
      res.status(404).json({error : "Product not found."})
    }
  }catch(error){
    res.status(500).json({error : "Failed to update the data."})
  }
})

// Category Routes

// 1. Functionality: This API call gets all categories from the db.

async function getAllCategories(){
  try{
    const categories = await Category.find()
    return categories
  }catch(error){
    console.log(error)
  }
}

app.get('/categories', async (req, res) => {
  try{
    const allCategories = await getAllCategories()
    if(allCategories.length > 0){
      res.status(200).json(allCategories)
    }else{
      res.status(404).json({message : "No category found."})
    }
  }catch(error){
    res.status(500).json({error : "Failed to fetch the categories data."})
  }
})



// 2. Functionality: This API call gets category by categoryId from the db.

async function getCategoryById(categoryId){
  try{
    const category = await Category.findById(categoryId)
    return category
  }catch(error){
    console.log(error)
  }
}

app.get("/categories/:categoryId", async (req, res) => {
  try{
    const category = await getCategoryById(req.params.categoryId)
    if(category){
      res.status(200).json(category)
    }else{
      res.status(404).json({message : "No category found."})
    }
    
  }catch(error){
    res.status(500).json({error : "Failed to fetch the category."})
  }
})



// Address

// add an address

async function addAddress(newAddress) {
  try{
    const address = new Address(newAddress)
    const saveAddress = await address.save()
    return saveAddress
  }catch(error){
    console.log(error)
  }
}

app.post('/addNewAddress', async (req,res) => {
  try{
    const address = await addAddress(req.body)
    if(address){
      res.status(200).json(address)
    }else{
      res.status(404).json({message : "cant add the address."})
    }
  }catch(error){
    res.status(500).json({error : "Failed to add new address."})
  }
}) 

// get all address

async function getAllAddres() {
  try{
    const allAddresses = await Address.find()
    return allAddresses
  }catch(error){
    console.log(error)
  }
}

app.get("/getAllAddresses", async (req, res) => {
  try{
    const allAddress = await getAllAddres()
    if(allAddress){
      res.status(200).json(allAddress)
    }else{
      res.status(404).json({message: "failed to get all addresses"})
    }
  }catch(error){
    res.status(500).json({error : "Failed to get all address."})
  }
})

// delete a address

async function deleteTheAddress(id){
  try{
    const address = await Address.findByIdAndDelete(id)
    return address
  }catch(error){
    console.log(error)
  }
}

app.delete("/delete/:addressId", async (req, res) => {
  try{
    const address = await deleteTheAddress(req.params.addressId)
    if(address){
      res.status(200).json({message : "Address delted successfully", address})
    }else{
      res(404).json({message : "Can't delte the address"})
    }
  }catch(error){
    res.status(500).json({message : "Failed to delete the address"})
  }
})

// update an address

async function updateAddress(addressId, updatedData) {
  try{
    const address = await Address.findByIdAndUpdate(addressId, updatedData, {new : true})
    return address
  }catch(error){
    console.log(error)
  }
}

app.put("/address/update/:addressId", async (req, res) => {
  try{
    const updatedAddress = await updateAddress(req.params.addressId, req.body)
    if(updatedAddress){
      res.status(200).json(updatedAddress)
    }else{
      res.status(404).json({message : "Can't update the address."})
    }
  }catch(error){
    res.status(500).json({message : "Failed to update the address"})
  }
})


const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`)
})