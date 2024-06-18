import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { FaShoppingCart } from 'react-icons/fa'; 
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -10, 
    top: 5, 
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function Navbar() {
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate('/loginuser');
  }

  const isAuthenticated = localStorage.getItem("authToken");

  let data = useCart();
    return (
      
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <NavLink className="navbar-brand fs-1 fst-italic" to="/">FoodO</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              {isAuthenticated && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    to="/myorders"
                  >
                    My Orders
                  </NavLink>
                </li>
              )}
            </ul>
            <div className="d-flex ms-auto">
              {!isAuthenticated ? (
                <>
                  <Link className="btn bg-white text-success mx-1" to="/loginuser">Login</Link>
                  <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
                </>
              ) : (
                <>
                  <div className='btn bg-white text-success mx-1' onClick={() => setCartView(true)}>
                    <StyledBadge badgeContent={data.length} color="error">
                      <FaShoppingCart />
                    </StyledBadge>
                  </div>
                  {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
                  <div className='btn bg-white text-success mx-1' onClick={handleLogout}>Logout</div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
