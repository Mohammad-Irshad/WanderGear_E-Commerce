import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchProducts, removeFromWishList, updateProductById } from './features/productsSlice'

const WishList = () => {

    const [showAddToCartAlert, setShowAddtoCartAlert] = useState(false)
    const [showRemoveAlert, setShowRemoveAlert] = useState(false)

    const dispatch = useDispatch()

    
    const {products} = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(fetchProducts())
    },[])
    

    const handleRemovePro = (pro) => {
        const updatedData = {wishList : false}
        dispatch(updateProductById({productId : pro._id, updatedData}))  
        setShowAddtoCartAlert(false)   
        setShowRemoveAlert(true) 
    }

    const handleAddtoCart = (pro) => {
        const updatedCartData = {cart : true}
        dispatch(updateProductById({productId : pro._id, updatedData : updatedCartData}))
        setShowRemoveAlert(false)
        setShowAddtoCartAlert(true) 
        const updatedWishlistData = {wishList : false}
        dispatch(updateProductById({productId : pro._id, updatedData : updatedWishlistData}))
        dispatch(addToCart({_id : pro._id}))
        
    }

    return (
        <div>
        <Header/>
        <main className='container'>
            <h1 className='text-center py-3 '>My Wishlist</h1>
            {products.length > 0 ?  
            <div className='row'>
            {products.map((pro) => (
                pro.wishList ? 
                (<div key={pro._id} className='col-md-3 mb-3'>
                    <div className="card" >
                    <img src={pro.productImageUrl} className="card-img-top" alt="product image" style={{ height: "20vw", objectFit: "cover" }}/>
                        <div className="card-body">
                            <h5 className="card-title">{pro.name}</h5>
                            <p className="card-text">Price: {pro.price - (pro.price * pro.discount / 100)}</p>
                            <div className="d-grid gap-2">
                                <button className="btn btn-success" type="button" onClick={() => handleAddtoCart(pro)}>Add to Cart</button>
                                <button className="btn btn-danger" type="button" onClick={() => handleRemovePro(pro)}>Remove from Wishlist</button>                                
                            </div>
                        </div>                        
                    </div>
                </div>)
                :
                null
            ))}            
            </div>
            : <p>You don't have anything in wishlish add some items.</p>
            }
            <br/>
            {
                showAddToCartAlert && 
                <div className="alert alert-success" role="alert">
                    Product added to the cart successfully!
                </div>
            }
            {
                showRemoveAlert && 
                <div className="alert alert-danger" role="alert">
                    Product removed from wishlist successfully!
                </div>
            }
            
            
        </main>
        </div>
    )
}

export default WishList
