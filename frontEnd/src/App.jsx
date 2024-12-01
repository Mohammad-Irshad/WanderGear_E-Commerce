import { Link, NavLink } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import useFetch from './useFetch'
import ProDescriptionText from './components/ProDescriptionText'

export default function App() {
  
  const {data, loading, error} = useFetch("https://wander-gear-backend.vercel.app/categories")
  
  return (
    <>
      <Header/>
      <main>
        <section className='container'>
          <div className='bg-primary text-center py-4 mt-2 rounded'
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1566679056462-2075774c8c07?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: 'black',
          }}>
            <h2>Travel Accessories</h2>
            <p><i>Explore our collection of travel essentials!</i></p>
            <NavLink className="btn btn-success" to="/productListing">Shop Now</NavLink>
          </div>
          
        </section>

        <section className='container'>          
          <div className='row'>
            {loading && <p>Loading...</p>}
            {error && <p>An error occured while fetching the categories.</p>}
            {data && data.length && (
              data.map(category => (
                <div key={category.categoryName} className='col-md-3 mt-3'>
                  <div className='card'>
                    <div className="card">
                      <img src={category.categoryImageUrl} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{category.categoryName}</h5>                        
                        <ProDescriptionText text={category.categoryDescription} maxLength={80} />
                        <Link to={`/productListing/${category.categoryName}`} className="btn btn-primary">View Products</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        
        <section className='container py-3'>
          <img src='https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?q=80&w=1812&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Travel Accessories pic' className='img-fluid' />
        </section>

        <section className=''>
          
        </section>
        
      </main>
      <Footer/>
    </>
    
  )
}
