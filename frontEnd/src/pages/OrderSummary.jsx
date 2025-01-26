import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useLocation } from 'react-router-dom'
import {FaStepBackward} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { makeCartEmpty, updateProductById } from './features/productsSlice'

const OrderSummary = () => {   

    const [orderPlacedMessage, setOrderPlacedMessage] = useState(false)   
    
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [deliveryCharge, setDeliveryCharge] = useState(499)
    

    const {state} = useLocation()
    const {userAddress} = state

    const {cart} = useSelector((state) => state.products)

    const dispatch = useDispatch()    

    const placeOrder = async () => {
      if(cart.length != 0){
        const updatedData = {cart : false}
        const result = await cart.map((pro) => dispatch(updateProductById({productId : pro._id, updatedData})))
        dispatch(makeCartEmpty())
        setOrderPlacedMessage(true)
        setDeliveryCharge(0)
      }      
    }
    
  useEffect(() => {
      setPrice(cart.reduce((acc, curr) => acc += (curr.price * curr.qty), 0))
      setDiscount(cart.reduce((acc, curr) => acc += (((curr.price * curr.qty) * curr.discount) / 100), 0))
      setTotalAmount(cart.reduce((acc, curr) => acc += ((curr.price * curr.qty) - (((curr.price * curr.qty) * curr.discount) / 100)), deliveryCharge))
    }, [cart])
    

  return (
    <div>
      <Header/>
      <main className='container'>
        <h1 className='text-center py-3'>Order Summary</h1>
        <div className='row'>
          <div className='col-md-6 mb-3'>
            <div className="card">
              <h5 className="card-header">Oder Items</h5>
              <div className="card-body">                
                <ol>
                  {cart.length != 0 ? cart.map((pro) => (
                    <li key={pro._id}>
                      <h5 className="card-title">{pro.name}</h5>
                      <p className="card-text">Quantity: {pro.qty}</p>
                      <hr/>
                    </li>
                  ))
                  :
                  <p>Your cart is empty!</p>                
                }
                </ol>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className="card">
                <h5 className="card-header">Order Details</h5>
                <div className="card-body">                
                  <p>Price: {price}</p>
                  <p>Discount: {discount.toFixed(2)}</p>
                  <p>Delivery Charges: {deliveryCharge}</p>
                  <hr/>
                  <h5>TOTAL AMOUNT: {totalAmount}</h5>
                  <hr/>
                  <p>You will save {discount.toFixed(2)} on this order</p>
                  <hr/>
                  <h6>Delivery Address</h6>
                  {
                    userAddress ? 
                    <p>{userAddress.addresslineOne} {userAddress.addresslineTwo}, {userAddress.city}, {userAddress.state}, {userAddress.zip}</p> 
                    : 
                    <p className='text-danger'>Please select a delivery address.</p>
                  }
                </div>
            </div>
          </div>
        </div>
        <div className='py-2 mt-3 d-flex justify-content-between'>
          <button className='btn btn-primary'>
              <Link to={`/cart`} className='text-decoration-none text-white'> <FaStepBackward/> CART</Link>
          </button>
          <button className='btn btn-success' onClick={() => placeOrder()}>Place Order</button>         
        </div>
        {
            orderPlacedMessage && <p className='text-success text-end'>Order placed successfully!</p>
        }
        
      </main>
    </div>
  )
}

export default OrderSummary
