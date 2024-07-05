
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchWeatherData } from '../../functions/WeatherSlice/WeatherSlice';
import { useDispatch } from 'react-redux';

const Weather = () => {
    const [pincode, setpincode] = useState('');
    const [countrycode, setcountrycode] = useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch();
    function pinCodeHandler(ev){
        setpincode(ev.target.value);
    }
    function countryCodeHandler(ev){
        setcountrycode(ev.target.value);
    }
    async function submitHandler(ev){
        ev.preventDefault();
        if(pincode.length==0||countrycode.length==0){
            alert('enter valid input');
            setpincode('');
            setcountrycode('');
            return;
        }
        await dispatch(fetchWeatherData({ pinCode: pincode, countryCode: countrycode }))  //idhar .then lagana pada kyunki time lagega isme
        navigate(`/getweather/${pincode}/${countrycode}`);
        setpincode('');
        setcountrycode('');
    }

  return (
    < >
        <form onSubmit={submitHandler} className='w-2/5 mx-auto flex flex-col gap-y-5 border border-stone-500 px-7 py-4 mt-16 text-black'>
            <input className='p-2 bg-orange-100' type='text' placeholder='Enter Pin Code' onChange={pinCodeHandler} value={pincode}/>
            <input className='p-2 bg-orange-100' type='text' placeholder='Enter Country Code :- For India use "IN"' onChange={countryCodeHandler} value={countrycode}/>
            <button className='w-32 mx-auto bg-zinc-950 p-1.5 rounded-2xl text-white' type='submit'>Submit</button>
        </form>
        <Outlet/>
    </>

  )
}

export default Weather