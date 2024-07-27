import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import CropSuitability from './components/SuitabilityForm/CropSuitability'
import IrrigationRecommendation from './components/SuitabilityForm/IrrigationRecommendation'
import CropRecommended from './components/CropRecommended/CropRecommended'
import IrrigationInfo from './components/IrrigationInfo/IrrigationInfo'
import Weather from './components/Weather/Weather'
import WeatherData from './components/WeatherData/WeatherData'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import DiscussForum from './components/DiscussForum/DiscussForum'
import AddRoom from './components/AddRoom/AddRoom'
import ChatBox from './components/ChatBox/ChatBox'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import Inventory from './components/Inventory/Inventory'
import AddItem from './components/AddItem/AddItem'
import Cart from './components/Cart/Cart'
import { useDispatch } from 'react-redux'
import { getUserOnRefresh } from './functions/UserSlice/UserSlice'
import Order from './components/Order/Order'
import PaymentSuccess from './components/PaymentPages/PaymentSuccess'
import Review from './components/Review/Review'
import Product from './components/Product/Product'

const App = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getUserOnRefresh());
  },[])
  return (
    <div className="flex flex-col min-w-screen min-h-screen bg-slate-800 text-white">
      <Navbar/>
      <main className='flex-grow container mx-auto p-4'>
      <Routes>
        <Route path='/' element={<Hero/>}/>
        <Route path='/suitablecrops' element={<CropSuitability/>}>
          <Route path=':soiltype/:temp/:location' element={<CropRecommended/>}/>
        </Route>
        <Route path='/irrigationschedules' element={<IrrigationRecommendation/>}>
          <Route path=':soiltype/:temp/:location' element={<IrrigationInfo/>}/>
        </Route>
        <Route path='/getweather' element={<Weather/>}>
          <Route path=':pinCode/:countryCode' element={<WeatherData/>}/>
        </Route>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/discuss' element={<DiscussForum/>}>
          <Route path='addroom' element={<AddRoom/>}/>
          <Route path=':id' element={<ChatBox/>}/>
        </Route>
        <Route path='/inventory' element={<Inventory/>}/>
        <Route path='/addItem' element={<AddItem/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/orders' element={<Order/>}/>
        <Route path='/payment/success/:id' element={<PaymentSuccess/>}/>
        <Route path='/review/:orderId' element={<Review/>}/>
        <Route path='/inventory/:itemId' element={<Product/>}/>
      </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App