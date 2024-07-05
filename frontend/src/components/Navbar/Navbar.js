import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getUserLogout } from '../../functions/UserSlice/UserSlice';

const Navbar = () => {
  const data=useSelector(state=>state.user);
  const dispatch=useDispatch();
  async function logoutHandler(ev){
      await dispatch(getUserLogout({username:data.user.username,email:data.user.email,password:data.user.password}));
  }
  return (
    <div className='flex justify-around font-bold text-xl items-center '>
        <NavLink to={'/'}>
          <img src='https://res.cloudinary.com/dytld8d0r/image/upload/v1720174509/WebLogo_zn2z0z.png' className='w-14'/>
        </NavLink>
        <NavLink to={'/suitablecrops'} className='hover:text-emerald-500'>Check Crop Suitability</NavLink>
        <NavLink to={'/irrigationschedules'} className='hover:text-emerald-500'>Irrigation Recommendations</NavLink>
        <NavLink to={'/getweather'} className='hover:text-emerald-500'>Get Weather Update</NavLink>
        <NavLink to={'/discuss'} className='hover:text-emerald-500'>Discuss</NavLink>
        <NavLink to={'/profile'} className='hover:text-emerald-500'>Profile</NavLink>
        {!data.isLoggedIn?<NavLink to={'/login'} className='hover:text-emerald-500'>{'Login'}</NavLink>:<button className='hover:text-emerald-500' onClick={logoutHandler}>Logout</button>}
    </div>
  )
}

export default Navbar