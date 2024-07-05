import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Hero = () => {
  return (
    <div className="relative">
      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        transitionTime={500}
        emulateTouch={true}
        className="overflow-hidden rounded-lg shadow-lg"
      >
        <div className="relative" style={{height:'500px'}}>
          <img
            src="https://cdn.pixabay.com/photo/2019/05/14/17/22/spring-4202968_1280.jpg"
            alt="Crop Suitability Assessment"
            className="object-cover h-full w-full"
          />
          <p className="absolute bottom-4 left-4 text-white text-2xl font-bold">
            Crop Suitability Assessment
          </p>
        </div>
        <div className="relative" style={{height:'500px'}}>
          <img
            src="https://cdn.pixabay.com/photo/2020/04/26/16/56/tractor-5096163_1280.jpg"
            alt="Irrigation Schedule Recommendations"
            className="object-cover h-full w-full"
          />
          <p className="absolute bottom-4 left-4 text-white text-2xl font-bold">
            Irrigation Schedule Recommendations
          </p>
        </div>
        <div className="relative" style={{height:'500px'}}>
          <img
            src="https://imgs.search.brave.com/gZPBS2LMJ43pqcoH30z6wO_2wpJoRjq-t7KzoLZr85w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzkzLzM5Lzkw/LzM2MF9GXzQ5MzM5/OTA1NF8zanZhdWxy/ZkNDM1oySE9lTUNS/eEVnQlhka3FGV3FG/Sy5qcGc"
            alt="Weather Forecast Integration"
            className="object-cover h-full w-full"
          />
          <p className="absolute bottom-4 left-4 text-white text-2xl font-bold">
            Weather Forecast Integration
          </p>
        </div>
        <div className="relative" style={{height:'500px'}}>
          <img
            src="https://imgs.search.brave.com/HnKnOExOUBTF0zfaMx44VZI4tg9-txyViSLp5AmqI5s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ2/MzQ1MjMzMy9waG90/by9zbWFydC1mYXJt/aW5nLWhvbGRpbmct/eW91bmctcGxhbnQt/c21hcnQtZmFybWlu/Zy1hbmQtcHJlY2lz/aW9uLWFncmljdWx0/dXJlLTQtMC1hZ3Jp/Y3VsdHVyZS53ZWJw/P2I9MSZzPTE3MDY2/N2Emdz0wJms9MjAm/Yz1waW5tV2tMcjdy/V3JaYXNEZFlIODI2/MGw3Nmgtb2cwUHRM/eFozYi1ZeGUwPQ"
            alt="Resource Management Tips"
            className="object-cover h-full w-full"
          />
          <p className="absolute bottom-4 left-4 text-white text-2xl font-bold">
            Resource Management Tips
          </p>
        </div>
        <div className="relative" style={{height:'500px'}}>
          <img
            src="https://imgs.search.brave.com/pW33OCuoNSdJYSb_ohsx979o0pYGeiymHA_ClwDI0i4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTg1/ODU5MTcxL3Bob3Rv/L2Zhcm1lcnMtaGFy/dmVzdGluZy1vcmdh/bmljLXNxdWFzaC1p/bi1maWVsZC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UUcy/VjJnRGkzLS1TMTJ2/Rjd4WWx3VGdQd2tE/bjlmNWhhYll3NnBO/UDFJdz0"
            alt="Community Forum"
            className="object-cover h-full w-full"
          />
          <p className="absolute bottom-4 left-4 text-white text-2xl font-bold">
            Community Forum
          </p>
        </div>
        <div className="relative" style={{height:'500px'}}>
          <img
            src="https://imgs.search.brave.com/YeUaxZRvLX0OFZGR3HKa8DQkjVSdLr8o2IaBkKyR_hs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8x/MC8xMC8xMS8zOS9l/bWFpbC00NTM5Mzgy/XzY0MC5qcGc"
            alt="Alerts and Notifications"
            className="object-cover h-full w-full"
          />
          <p className="absolute bottom-4 left-4 text-white text-2xl font-bold">
            Alerts and Notifications
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
