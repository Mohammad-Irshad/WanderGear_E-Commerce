import { Link, NavLink } from "react-router-dom";
import { FaHeart, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'; 
import { useDispatch } from "react-redux";
import { setSearchProducts } from "../pages/features/productsSlice";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRef, useEffect } from 'react';


library.add(fas, fab);

const Header = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const location = useLocation()
  const inputRef = useRef(null)

  const handleSearchChange = (e) => {
    
    dispatch(setSearchProducts(e.target.value))
  }

  const handleSearchClick = () => {
    if (location.pathname !== '/productListing') {
      navigate('/productListing');
    }
  };

  
  useEffect(() => {
    if (location.pathname === '/productListing') {
      inputRef.current?.focus();
    }
  }, [location.pathname]);


  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
          WanderGear</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto">
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/productListing">Product Listing</NavLink>
            </div>
            <div className="d-flex mx-auto align-items-center search-container me-2 flex-grow-1">
              <button className="btn btn-outline-secondary rounded-0 rounded-start">
                <FaSearch/>
              </button>
              <input 
              className="form-control rounded-0 rounded-end" 
              type="text" 
              placeholder="Search Accessories"
              ref={inputRef}
              onClick={handleSearchClick}
              onChange={handleSearchChange} />
            </div>
            <div className="d-flex align-items-center">
              <Link to={`/wishList`}>
              <button className="btn btn-outline-secondary me-2">
                <FaHeart /> 
              </button>
              </Link>
              <Link to={`/cart`}>
                <button className="btn btn-outline-secondary me-2">
                  <FaShoppingCart /> 
                </button>
              </Link>
              <Link to={`/userProfile`}>
                <button className="btn btn-outline-secondary btn-border-none me-2">
                  <FaUser/>
                </button>
              </Link>              
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
