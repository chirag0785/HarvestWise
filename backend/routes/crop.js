const express=require('express');
const Crop = require('../models/crop');
const SoilType=require('../models/soilType');
const GeoLocation = require('../models/geoLocation');
const CropType = require('../models/cropType');
const GeneralAdvice = require('../models/generalAdvice');
const IrrigationSchedule=require('../models/irrigationSchedule');
const router=express.Router();
function capitalizeWords(word){
    return word.split(' ').map((w)=>{
        return w.charAt(0).toUpperCase()+w.slice(1).toLowerCase();
    }).join(' ');
}
router.get('/',async (req,res,next)=>{
    let {soilType,temp,location}=req.query;

    try{
        soilType=capitalizeWords(soilType);
        let soil=await SoilType.findOne({name:soilType});
        if(!soil){
            return res.status(404).send({msg:'SoilType not found'});
        }
        // soilType=(soil._id);
        location=capitalizeWords(location);
        let loc=await GeoLocation.findOne({name:location});
        if(!loc){
            return res.status(404).send({msg:'Location not found'}); 
        }
        // location=(loc._id);
        temp=+temp;
        let suitableCrops=await Crop.find({
            TMin:{ $lte : temp },
            TMax:{ $gte : temp },
        }).populate('cropType')
        .populate('suitableSoilType')
        .populate('preferredLoc');

        suitableCrops=suitableCrops.filter((s)=>{
            let soilTypeList=s.suitableSoilType;
            let soilTypeFound=false;
            soilTypeList.forEach((s)=>{
                if(s.name.toUpperCase()==soilType.toUpperCase()){
                    soilTypeFound=true;
                }
            })
            let locationFound=false;
            s.preferredLoc.forEach((s)=>{
                if(s.name.toUpperCase()==location.toUpperCase()){
                    locationFound=true;
                }
            })
            return locationFound&&soilTypeFound;
        })
        return res.status(200).json(suitableCrops);
    }catch(err){
        return res.status(500).json({msg:'Internal Server error'});
    }
})

router.get('/recommendations',async (req,res,next)=>{
    let {soilType,temp,location}=req.query;
    try{
        soilType=capitalizeWords(soilType)
        let soil=await SoilType.findOne({name:soilType});
        if(!soil){
            return res.status(404).send({msg:'SoilType not found'});
        }
        // soilType=(soil._id);
        location=capitalizeWords(location);
        let loc=await GeoLocation.findOne({name:location});
        if(!loc){
            return res.status(404).send({msg:'Location not found'}); 
        }
        // location=(loc._id);
        temp=+temp;
        let suitableCrops=await Crop.find({
            TMin:{ $lte : temp },
            TMax:{ $gte : temp },
        }).populate('cropType')
        .populate('suitableSoilType')
        .populate('preferredLoc');

        suitableCrops=suitableCrops.filter((s)=>{
            let soilTypeList=s.suitableSoilType;
            let soilTypeFound=false;
            soilTypeList.forEach((s)=>{
                if(s.name.toUpperCase()==soilType.toUpperCase()){
                    soilTypeFound=true;
                }
            })
            let locationFound=false;
            s.preferredLoc.forEach((s)=>{
                if(s.name.toUpperCase()==location.toUpperCase()){
                    locationFound=true;
                }
            })
            return locationFound&&soilTypeFound;
        })
        let cropTypes=[];
        suitableCrops.forEach((c)=>{
            if(!cropTypes.includes(c.cropType._id)){
                cropTypes.push(c.cropType._id);
            }
        })
        let typesOfCrops=await CropType.find({_id:{$in:cropTypes}}).populate('irrigationSchedule');
        let generalAdvice=await GeneralAdvice.find({
            TMax:{$gte:temp},
            TMin:{$lte:temp}
        }).populate('soilType');
        generalAdvice=generalAdvice.filter((g)=>{
            return g.soilType.name==soil.name;
        })
        res.status(200).json({
            schedules:typesOfCrops,
            generalAdvice
        });
    }catch(err){
        return res.status(500).json('Internal Server error');
    }
})

module.exports=router;