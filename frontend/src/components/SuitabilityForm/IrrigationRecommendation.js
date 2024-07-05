import React, { useState } from 'react'
import InputDetailForm from '../InputDetailForm/InputDetailForm'
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCropRecommendations } from '../../functions/CropTypeSlice/CropTypeSlice';
const IrrigationRecommendation = () => {
    const [soiltype, setsoiltype] = useState('')
    const [temp, settemp] = useState(0)
    const [location, setlocation] = useState('');
    const dispatch=useDispatch();
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
        dispatch(fetchCropRecommendations({soiltype,temp,location}));

        setsoiltype('');
        setlocation('');
        settemp(0);
        navigate(`/irrigationschedules/${soiltype}/${temp}/${location}`);
    }

  return (
    <>
        <InputDetailForm soilChangeHandler={soilChangeHandler}
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

export default IrrigationRecommendation