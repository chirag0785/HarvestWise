const  axios  = require('axios');
const express=require('express');
const router=express.Router();
router.get('/:pinCode/:countryCode',async (req,res,next)=>{
    let {pinCode,countryCode}=req.params;
    pinCode=Number(pinCode);
    try{
        let response=await axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${pinCode},${countryCode}&appid=${process.env.WEATHER_API_KEY}`);
        let {lat,lon,name}=response.data;
        let {data}=await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`);
        return res.status(200).json({temperatureDetails:data.main,
            windspeed:data.wind.speed,
            weatherDetails:data.weather[0],
            cloudiness:data.clouds.all,
            name});
    }catch(err){
        return res.status(500).json('Internal Server error');
    }
})
module.exports=router;