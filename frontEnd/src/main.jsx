import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js//bootstrap.bundle'
import ProductListing from './pages/ProductListing'
import { Provider } from 'react-redux'
import store from './app/store'
import ProductDetails from './pages/ProductDetails'
import WishList from './pages/WishList'
import Cart from './pages/Cart'
import OrderSummary from './pages/OrderSummary'
import UserProfile from './pages/UserProfile'


const router = createBrowserRouter([
	{
		path : '/',
		element : <App/>
	},
	{
		path : '/productListing',
		element : <ProductListing/>
	},
	{
		path : '/productListing/:selectedCategory',
		element : <ProductListing/>
	},
	{
		path : '/productListing/products/:productId',
		element : <ProductDetails/>
	},
	{
		path : '/wishList',
		element : <WishList/>
	},
	{
		path : '/cart',
		element : <Cart/>
	},
	{   path : '/orderSummary',
		element : <OrderSummary/>
		
	},
	{
		path : '/userProfile',
		element : <UserProfile/>
	}

])

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
	</Provider>
)