import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faTint, faCloudSun, faBoxOpen, faComments, faShoppingCart, faClipboardList, faUser, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { getUserLogout } from '../../functions/UserSlice/UserSlice';

const Navbar = () => {
  const data = useSelector(state => state.user);
  const dispatch = useDispatch();

  async function logoutHandler(ev) {
    await dispatch(getUserLogout({ username: data.user.username, email: data.user.email, password: data.user.password }));
  }

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to={'/'}>
          <img src='https://res.cloudinary.com/dytld8d0r/image/upload/v1720174509/WebLogo_zn2z0z.png' className='w-14' alt="WebLogo" />
        </NavLink>
        <div className="flex space-x-6">
          <NavLink to={'/suitablecrops'} className='text-gray-300 hover:text-emerald-500 flex items-center space-x-1'>
            <FontAwesomeIcon icon={faSeedling} />
            <span>Check Crop Suitability</span>
          </NavLink>
          <NavLink to={'/irrigationschedules'} className='text-gray-300 hover:text-emerald-500 flex items-center space-x-1'>
            <FontAwesomeIcon icon={faTint} />
            <span>Irrigation Recommendations</span>
          </NavLink>
          <NavLink to={'/getweather'} className='text-gray-300 hover:text-emerald-500 flex items-center space-x-1'>
            <FontAwesomeIcon icon={faCloudSun} />
            <span>Get Weather Update</span>
          </NavLink>
          <NavLink to={'/inventory'} className='text-gray-300 hover:text-emerald-500 flex items-center space-x-1'>
            <FontAwesomeIcon icon={faBoxOpen} />
            <span>Inventory</span>
          </NavLink>
          <NavLink to={'/discuss'} className='text-gray-300 hover:text-emerald-500 flex items-center space-x-1'>
            <FontAwesomeIcon icon={faComments} />
            <span>Discuss</span>
          </NavLink>
          <NavLink to={'/cart'} className='text-gray-300 hover:text-emerald-500 flex items-center space-x-1'>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>Cart</span>
          </NavLink>
          <NavLink to={'/orders'} className='text-gray-300 hover:text-emerald-500 flex items-center space-x-1'>
            <FontAwesomeIcon icon={faClipboardList} />
            <span>Orders</span>
          </NavLink>
          <NavLink to={'/profile'} className='text-gray-300 hover:text-emerald-500 flex items-center space-x-1'>
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </NavLink>

          {!data.isLoggedIn ?
            <NavLink to={'/login'} className='text-gray-300 hover:text-emerald-500 flex items-center space-x-1'>
              <FontAwesomeIcon icon={faSignInAlt} />
              <span>Login</span>
            </NavLink> :
            <button className='text-gray-300 hover:text-emerald-500 flex items-center space-x-1' onClick={logoutHandler}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
