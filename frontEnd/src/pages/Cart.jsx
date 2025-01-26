import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import {addToAddress, addToCart, addToWishList, removeFromAddresses, removeFromCart, updateTheAddress, removeOneFromCart, updateProductById, fetchProducts, addAddressOfUser, getAllAddress, deleteAddress, updateUserAddress} from './features/productsSlice'
import { Link } from 'react-router-dom'

const Cart = () => {

  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [deliveryCharge, setDeliveryCharge] = useState(499)
  const [totalAmount, setTotalAmount] = useState(0)
  const [deliveryAddress, setDeliveryAddress] = useState(null)

  const [showMoveToWishlistAlert, setShowMoveToWishlistAlert] = useState(false)
  const [showRemoveFromCartAlert, setShowRemoveFromCartAlert] = useState(false)
  const [showAddToCartAlert, setShowAddToCartAlert] = useState(false)

  const [addAdress, setAddAddress] = useState(false)
  const [editAddress, setEditAddress] = useState(false)
  const [address, setAddress] = useState({
    id : null,
    addresslineOne : '',
    addresslineTwo : '',
    city : '',
    state : '',
    zip : ''
  })
  const [updateAddress, setUpdateAddress] = useState({})

  const dispatch = useDispatch()
  const {cart, userProfile, products} = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(getAllAddress())
  },[]) 
  
  const handleAddtoCart = (pro) => {
    dispatch(addToCart({...pro, qty : pro.qty ? pro.qty + 1 : 1}))
    setShowMoveToWishlistAlert(false)
    setShowRemoveFromCartAlert(false)
    setShowAddToCartAlert(true)
  }


  const handleRemoveOneFromCart = (pro) => {
    if(pro.qty > 1){
      dispatch(removeOneFromCart(pro._id))
    }else{
      dispatch(removeOneFromCart(pro._id))
      const updateCart = {cart : false}
      dispatch(updateProductById({productId : pro._id, updatedData : updateCart}))
    }    
   
    setShowMoveToWishlistAlert(false)
    setShowAddToCartAlert(false)
    setShowRemoveFromCartAlert(true)
  }

  const handleRemoveFromCart = (id) => {
    const updateCart = {cart : false}
    dispatch(updateProductById({productId : id, updatedData : updateCart}))
    dispatch(removeFromCart(id))
    setShowAddToCartAlert(false)
    setShowMoveToWishlistAlert(false)
    setShowRemoveFromCartAlert(true)
  }

  const handleMoveToWishlist = (pro) => {
    const updateWishList = {wishList : true}
    const updateCart = {cart : false}
    dispatch(updateProductById({productId : pro._id, updatedData : updateWishList}))
    dispatch(updateProductById({productId : pro._id, updatedData : updateCart})) 
    const {qty, ...newPro} = pro
    dispatch(addToWishList(newPro)) 
    dispatch(removeFromCart(pro._id))
    setShowRemoveFromCartAlert(false)
    setShowAddToCartAlert(false)
    setShowMoveToWishlistAlert(true)
  }

  useEffect(() => {
    setPrice(cart.reduce((acc, curr) => acc += (curr.price * curr.qty), 0))
    setDiscount(cart.reduce((acc, curr) => acc += (((curr.price * curr.qty) * curr.discount) / 100), 0))
    setTotalAmount(cart.reduce((acc, curr) => acc += ((curr.price * curr.qty) - (((curr.price * curr.qty) * curr.discount) / 100)), deliveryCharge))
  }, [cart])

  

  const handleCancelAddAddress = () => {
    setAddAddress(false)
  }

  const handleAddAddress = () => {    
    setAddAddress(true)
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setAddress({...address, [name] : value})
  }

  const handleDeleteAddress = (add) => {
    dispatch(deleteAddress(add._id))
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault()

    dispatch(addAddressOfUser(address))
    setAddAddress(false)
  }

  const handleEditAddress = (add) => {
    setEditAddress(true)
    setUpdateAddress(add)
  }

  const handleCancelEditAddress = () => {
    setEditAddress(false)
  }

  const handleChangeOnUpdateAddress = (e) => {
    const {name, value} = e.target
    setUpdateAddress({...updateAddress, [name] : value})
  }

  const handleUpdateAddress = (e) => {
    e.preventDefault()
    dispatch(updateUserAddress({addressId : updateAddress._id, updatedData : updateAddress}))
    setUpdateAddress({})
    setEditAddress(false)
  }

  useEffect(() => {
    setTimeout(() => {
      setShowAddToCartAlert(false)
      setShowRemoveFromCartAlert(false)
      setShowMoveToWishlistAlert(false)
    },2000)
  },[showAddToCartAlert, showRemoveFromCartAlert, showMoveToWishlistAlert])



  return (
    <div>
      <Header/>
      <main className='container'>
        <h1 className='text-center'>My Cart Items ({cart.reduce((acc, curr) => acc += curr.qty, 0)})</h1>
        <div>
            {
              showMoveToWishlistAlert && 
              <div className="alert alert-warning" role="alert">
                  Product moved to the wishlist successfully!
              </div>
            }
            {
              showRemoveFromCartAlert && 
              <div className="alert alert-danger" role="alert">
                  Product removed from the cart successfully!
              </div>
            }
            {
              showAddToCartAlert && 
              <div className="alert alert-success" role="alert">
                  Product added to the cart successfully!
              </div>
            }
            </div>
        <section className='container py-4'>
          <div className='row'>
            <div className='col-md-7'>
              {cart.length > 0 ?  
              cart.map((pro) => (
                <div key={pro._id} className="card mb-3" >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={pro.productImageUrl} className="img-fluid rounded-start" alt="..."/>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{pro.name}</h5>
                          <p className="card-text"> <span>Price: Rs.{pro.price - (pro.price * pro.discount /100)}</span></p>
                          <p className="card-text"> <span>{pro.discount}% Off</span></p>
                          <p className="card-text"><small className="text-body-secondary">Rating: {pro.rating}</small></p>
                          <p className="card-text">
                            <button className='btn btn-sm me-2 border-secondary rounded' onClick={() => handleRemoveOneFromCart(pro)}>-</button>
                            {pro.qty}
                            <button className='btn btn-sm ms-2 border-secondary rounded' onClick={() => handleAddtoCart(pro)}>+</button>
                          </p>
                          <br/>
                          <div className="d-grid gap-2 col-6 mx-3">
                            <button className="btn btn-info" type="button" onClick={() => handleMoveToWishlist(pro)}>Move to Wishlist</button>
                            <button className="btn btn-danger" type="button" onClick={() => handleRemoveFromCart(pro._id)}>Remove from Cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              ))
              : 
              <p>Your cart is empty.</p>
              }
            </div>
            {addAdress ? 
            <div className='col-md-5'>              
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Add Address Details</h5>
                  <form>
                    <label className='form-label'>Address Line One:</label><br/>
                    <input type='text' className='form-control' name='addresslineOne' onChange={(e) => handleChange(e)} />
                    
                    <label className='form-label'>Address Line Two:</label><br/>
                    <input className='form-control' type='text' name='addresslineTwo' onChange={(e) => handleChange(e)} />
                    
                    <label className='form-label'>City:</label><br/>
                    <input className='form-control' type='text' name='city' onChange={(e) => handleChange(e)} />
                    
                    <label className='form-label'>State:</label><br/>
                    <input className='form-control' type='text' name='state' onChange={(e) => handleChange(e)} />
                    
                    <label className='form-label'>Zip:</label><br/>
                    <input className='form-control' type='text' name='zip' onChange={(e) => handleChange(e)} />
                    <br/>
                    <div className='d-flex justify-content-between'>
                      <button className='btn btn-sm btn-danger' onClick={() => handleCancelAddAddress()}>Cancel</button>
                      <button type='submit' className='btn btn-sm btn-success' onClick={(e) => handleAddressSubmit(e)}>Save Address</button>
                    </div>
                  </form>
                </div>
              </div>
            </div> 
            :
            editAddress && Object.keys(updateAddress).length > 0? 
            <div className='col-md-5'>              
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Edit Address Details</h5>
                  <form>
                    <label className='form-label'>Address Line One:</label><br/>
                    <input type='text' value={updateAddress.addresslineOne} className='form-control' name='addresslineOne' onChange={(e) => handleChangeOnUpdateAddress(e)} />
                    
                    <label className='form-label'>Address Line Two:</label><br/>
                    <input className='form-control' value={updateAddress.addresslineTwo} type='text' name='addresslineTwo' onChange={(e) => handleChangeOnUpdateAddress(e)} />
                    
                    <label className='form-label'>City:</label><br/>
                    <input className='form-control' value={updateAddress.city} type='text' name='city' onChange={(e) => handleChangeOnUpdateAddress(e)} />
                    
                    <label className='form-label'>State:</label><br/>
                    <input className='form-control' value={updateAddress.state} type='text' name='state' onChange={(e) => handleChangeOnUpdateAddress(e)} />
                    
                    <label className='form-label'>Zip:</label><br/>
                    <input className='form-control' value={updateAddress.zip} type='text' name='zip' onChange={(e) => handleChangeOnUpdateAddress(e)} />
                    <br/>
                    <div className='d-flex justify-content-between'>
                      <button className='btn btn-sm btn-danger' onClick={() => handleCancelEditAddress()}>Cancel</button>
                      <button type='submit' className='btn btn-sm btn-success' onClick={(e) => handleUpdateAddress(e)}>Update Address</button>
                    </div>
                  </form>
                </div>
              </div>
            </div> 
            :
            <div className='col-md-5'>
              {cart.length > 0 ? 
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Price Details</h5>
                    <hr/>
                    <p className="card-text">Price ({cart.reduce((acc, curr) => acc += curr.qty, 0)} items) :  
                      {price.toFixed(2)}
                    </p>
                    <p>Discount: {discount.toFixed(2)}</p>
                    <p>Delivery Charges: {deliveryCharge}</p>
                    <hr/>
                    <h5>TOTAL AMOUNT: {totalAmount.toFixed(2)}</h5>
                    <hr/>
                    <p>You will save {discount.toFixed(2)} on this order</p>
                    <hr/>

                    <div>
                      <div className='d-flex justify-content-between mb-3'>
                        <h5>Select Delivery Address </h5>
                        <button className='btn btn-secondary btn-sm' onClick={() => handleAddAddress()}>Add Address</button>
                      </div>
                    
                      {
                        userProfile.addresses.map((add, index) => (
                          <div key={add._id || add.id}>
                            <label>Address: {index+1}</label>
                            <button className='btn btn-sm btn-secondary mx-2' onClick={() => handleEditAddress(add)}>Edit</button>
                            <button className='btn btn-sm btn-danger mx-2' onClick={() => handleDeleteAddress(add)}>Delete</button>
                            <br/>
                            <label>
                              <input type='radio' name='address' value={add} className='me-2' onChange={() => setDeliveryAddress(add)}/>
                              {add.addresslineOne} {add.addresslineTwo}, {add.city} {add.state}, {add.zip}
                            </label>
                            <br/><br/>
                          </div>
                        ))
                      }
                    </div>                    
                    <br/>
                    <button className='btn btn-primary'>
                      <Link to='/orderSummary' 
                      state={{userAddress : deliveryAddress, 
                        cart, price, discount, 
                        deliveryCharge, totalAmount,                      
                      }} 
                      className='text-decoration-none text-white'>
                        Checkout
                      </Link>                      
                    </button>
                  </div>
                </div>
              : <p>Your cart is empty add some items to see cart order details.</p>
              }
            </div>            
            }
          </div>
        </section>
      </main>
    </div>
  )
}

export default Cart

