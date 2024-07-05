import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import InputDetailForm from '../InputDetailForm/InputDetailForm';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../functions/CropSlice/CropSlice';

const SuitabilityForm = () => {
    const dispatch=useDispatch();
    const [cropRecom, setcropRecom] = useState([]);
    const [soiltype, setsoiltype] = useState('');
    const [temp, settemp] = useState(0);
    const [location, setlocation] = useState('');
    const navigate=useNavigate();
    function soilChangeHandler(ev){
        setsoiltype(ev.target.value);
    }
    function tempChangeHandler(ev){
        settemp(ev.target.value);
    }
    function locationChangeHandler(ev){
        setlocation(ev.target.value);
    }
    function formSubmitHandler(ev){
        ev.preventDefault();
        if(soiltype.length==0||temp.length==0||location.length==0){
            alert('Enter valid input');
            return;
        }

        dispatch(fetchData({soiltype,temp,location}));
        setsoiltype('');
        setlocation('');
        settemp(0);
        navigate(`/suitablecrops/${soiltype}/${temp}/${location}`);
    }

  return (
    <>
    <InputDetailForm 
    soilChangeHandler={soilChangeHandler}
    tempChangeHandler={tempChangeHandler}
    locationChangeHandler={locationChangeHandler}
    formSubmitHandler={formSubmitHandler}
    soiltype={soiltype}
    temp={temp}
    location={location}/>
    <Outlet/>
    </>
  )
}

export default SuitabilityForm