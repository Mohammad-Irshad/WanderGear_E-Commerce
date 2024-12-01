import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// Get All the products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get("http://localhost:3000/products")
    return response.data
})

// Get Product by id
export const fetchProductById = createAsyncThunk("product/fetchProductById", async (productId) => {
    const response = await axios.get(`http://localhost:3000/products/${productId}`) 
    return response.data
})

// Update product by id 
export const updateProductById = createAsyncThunk("product/updateProductById", async ({productId, updatedData}) => {
    const response = await axios.put(`http://localhost:3000/products/update/${productId}`, updatedData)
    return response.data
})

// Add address 

export const addAddressOfUser = createAsyncThunk('address/addAddressOfUser', async (newAddress) => {
    const response = await axios.post("http://localhost:3000/addNewAddress", newAddress)
    return response.data
})

// Get all the address

export const getAllAddress = createAsyncThunk('address/getAllAddress', async () => {
    const response = await axios.get("http://localhost:3000/getAllAddresses")
    return response.data
})

// delete the address

export const deleteAddress = createAsyncThunk('address/deleteAddress', async (addressId) => {
    const response = await axios.delete("http://localhost:3000/delete/"+addressId)
    return response.data
})

// update the address

export const updateUserAddress = createAsyncThunk('address/updateAddress', async ({addressId, updatedData}) => {
    console.log("Address id ", addressId, "updatedData", updatedData)
    const response = await axios.put(`http://localhost:3000/address/update/${addressId}`,updatedData)
    return response.data
})

export const productsSlice = createSlice({
    name : "products",
    initialState : {
        products : [],
        oneProduct : null,
        searchProducts : [],
        wishlist : [],
        cart : [],
        userProfile : {
            name : "Mohammad Irshad",
            email : "mohammadirshadcse@gmail.com",
            phoneNo : "+91 9540983820",
            addresses : [{
                _id : Date.now(),
                addresslineOne : 'Friends Colony',
                addresslineTwo : 'Near Old Faridabad Chock',
                city : 'Faridabad',
                state : 'Haryana',
                zip : '121002'
            }]
        },
        sortBy : "All",
        status : "idle",
        error : false
    },
    reducers : {
        setSortBy : (state, action) => {            
            state.sortBy = action.payload
        },
        addToWishList : (state, action) => {
            let  alreadyExistProIndex = -1
            if(state.wishlist.length > 0){
                alreadyExistProIndex = state.wishlist.findIndex((pro) => pro._id === action.payload._id)
            }
            if(alreadyExistProIndex >= 0){
                console.log("Product is already in wishlist") 
            }else{
                state.wishlist.push(action.payload)
            } 
            
        },
        removeFromWishList : (state, action) => {
            state.wishlist = state.wishlist.filter((pro) => pro._id != action.payload)
        },
        addToCart : (state, action) => {
            const index = state.cart.findIndex((pro) => pro._id === action.payload._id)  
            if(index >= 0){
                state.cart[index].qty += 1  
            }   
        },
        removeOneFromCart : (state, action) => {
            state.cart = state.cart.filter((item) => {
                if(item._id === action.payload){
                    if(item.qty > 1){
                        item.qty -= 1
                    }else{
                        return false
                    }
                }
                return true
            })
        },
        removeFromCart : (state, action) => {
            state.cart = state.cart.filter((item) => item._id != action.payload)
        },
        addToAddress : (state, action) => {
            state.userProfile.addresses.push(action.payload)
        },
        removeFromAddresses : (state, action) => {
            state.userProfile.addresses = state.userProfile.addresses.filter((add) => add.id != action.payload)
        },
        updateTheAddress : (state, action) => {
            const index = state.userProfile.addresses.findIndex((add) => add.id === action.payload.id)
            state.userProfile.addresses[index] = action.payload
        },
        setSearchProducts : (state, action) => {
            if(action.payload === ''){
                state.searchProducts = state.products
            }else{
                state.searchProducts = state.products.filter((pro) => 
                    pro.name.toLowerCase().includes(action.payload.toLowerCase())
                )
            }
            
        }

    },
    extraReducers : (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "success";
            state.products = action.payload;

            const existingCart = state.cart.reduce((acc, item) => {
                acc[item._id] = item.qty;
                return acc;
            }, {});

            state.cart = action.payload.filter((pro) => pro.cart).map((pro) => ({
                ...pro,
                qty: existingCart[pro._id] !== undefined ? existingCart[pro._id] : 1
            }));

            state.wishlist = action.payload.filter((pro) => pro.wishList);
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = "error"
            state.error = action.payload.message
        })
        .addCase(fetchProductById.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchProductById.fulfilled, (state, action) => {
            state.status = 'success'
            state.oneProduct = action.payload
        })
        .addCase(fetchProductById.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        .addCase(updateProductById.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(updateProductById.fulfilled, (state, action) => {
            state.status = 'success'
            console.log(action.payload.updatedProduct)
            const index = state.products.findIndex((pro) => pro._id === action.payload.updatedProduct._id)
            state.products[index] = action.payload.updatedProduct
        })
        .addCase(updateProductById.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        .addCase(addAddressOfUser.pending, (state) => {
            state.status = 'loading'            
        })
        .addCase(addAddressOfUser.fulfilled, (state, action) => {
            state.status = 'success'
            state.userProfile.addresses.push(action.payload)
        })
        .addCase(addAddressOfUser.rejected, (state, action) => {
            state.error = 'error'
            state.error = action.payload.message
        })
        .addCase(getAllAddress.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(getAllAddress.fulfilled, (state, action) => {
            state.status = 'loading'
            state.userProfile.addresses = action.payload
        })
        .addCase(getAllAddress.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        .addCase(deleteAddress.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(deleteAddress.fulfilled, (state, action) => {
            state.status = 'success'
            state.userProfile.addresses = state.userProfile.addresses.filter((add) => add._id != action.payload.address._id)
        })
        .addCase(deleteAddress.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        .addCase(updateUserAddress.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(updateUserAddress.fulfilled, (state, action) => {
            state.status = 'sucess'
            const index = state.userProfile.addresses.findIndex((add) => add._id === action.payload._id)
            state.userProfile.addresses[index] = action.payload
        })
        .addCase(updateUserAddress.rejected, (state) => {
            state.status = 'error'
            state.error = action.payload.message
        })
    }
})

export const {setSortBy, addToWishList, removeFromWishList, addToCart, removeFromCart, addToAddress, removeFromAddresses, updateTheAddress, removeOneFromCart, setSearchProducts} = productsSlice.actions

export default productsSlice.reducer