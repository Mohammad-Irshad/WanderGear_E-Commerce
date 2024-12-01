import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addToWishList, fetchProductById, updateProductById } from './features/productsSlice'

const ProductDetails = () => {
    const {productId} = useParams()
    const [showWishListAlert, setShowWishListAlert] = useState(false)
    const [showCartAlert, setShowCartAlert] = useState(false)

    const dispatch = useDispatch()
    const {oneProduct, status, error} = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(fetchProductById(productId))
    },[])


    const handleAddToWishList = (pro) => {
        const updatedData = {wishList : true}
        dispatch(updateProductById({productId : pro._id, updatedData}))  
        setShowCartAlert(false)
        setShowWishListAlert(true)   
    }

    const handleAddtoCart = (pro) => {
        if(pro.cart){
            dispatch(addToCart(pro))
        }else{
            const updatedData = {cart : true}
            dispatch(updateProductById({productId : pro._id, updatedData}))            
        }
        setShowWishListAlert(false)
        setShowCartAlert(true)       
    }
       

    return (
        <div>
        <Header/>
        <main className='container py-3'>
            <h1>Product Details</h1>
            {status === 'loading' && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {oneProduct && 
            <div className='py-3'>
                <div className="card mb-3" >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={oneProduct.productImageUrl} className="img-fluid rounded-start" alt="pro image"/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{oneProduct.name}</h5>
                            <p className="card-text">{oneProduct.productDescription}</p>
                            <p className="card-text"><small className="text-body-secondary">Color: {oneProduct.color}</small></p>
                            <p className="card-text">Original Price: {oneProduct.price}</p>
                            <p className="card-text">Discount: {oneProduct.discount}%</p>
                            <p className="card-text"> <span>Discounted Price: Rs.{oneProduct.price - (oneProduct.price * oneProduct.discount /100)}</span></p>
                            <p className="card-text"><small className="text-body-secondary">Rating: {oneProduct.rating}</small></p>
                            <br/>
                            <div className="d-flex justify-content-between">
                                <button className='btn btn-success mx-4' onClick={() => handleAddtoCart(oneProduct)}>Add to Cart</button>
                                <button className='btn btn-warning mx-4' onClick={() => handleAddToWishList(oneProduct)}>Add to Wishlist</button>
                            </div>                            
                        </div>                        
                    </div>                    
                    </div>                    
                </div>
                {
                    showWishListAlert && 
                    <div className="alert alert-warning" role="alert">
                        Product added to the wishlist successfully!
                    </div>
                }
                {
                    showCartAlert && 
                    <div className="alert alert-primary" role="alert">
                        Product added to the cart successfully!
                    </div>
                }
            </div>
            }
        </main>
        </div>
    )
}

export default ProductDetails
