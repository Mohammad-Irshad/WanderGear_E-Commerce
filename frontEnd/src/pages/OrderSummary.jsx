import React from 'react'
import Header from '../components/Header'
import { Link, useLocation } from 'react-router-dom'
import {FaStepBackward} from 'react-icons/fa'

const OrderSummary = () => {   

    const {state} = useLocation()
    const {cart, userAddress, price, discount, deliveryCharge, totalAmount} = state
    console.log(userAddress)
    
    

  return (
    <div>
      <Header/>
      <main className='container'>
        <h1 className='text-center py-3'>Order Summary</h1>
        <div className='row'>
          <div className='col-md-6'>
            <div className="card">
              <h5 className="card-header">Oder Items</h5>
              <div className="card-body">                
                <ol>
                  {cart.map((pro) => (
                    <li key={pro._id}>
                      <h5 className="card-title">{pro.name}</h5>
                      <p className="card-text">Quantity: {pro.qty}</p>
                      <hr/>
                    </li>
                  ))}
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
          <button className='btn btn-success'>Place Order</button>
        </div>

        
      </main>
    </div>
  )
}

export default OrderSummary
