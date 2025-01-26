import React, { useEffect } from 'react'
import './Wheather.css'
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import { use } from 'react';

const Wheather = () => {

    const search = async(city)=>{
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;
            
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        search('London');
    }, [])

  return (
   
    <div className="wheather">
        <div className="search_bar">
            <input type="text" name="" id="" placeholder='Search' />
            <img src={search_icon} alt="p" className='wheather_icon' />
        </div>
        

        <img src={clear_icon} alt="" />
        <p className='temperature'>16°C</p>
        <p className='location'>London</p>

        <div className="wheather_data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>91%</p>
                    <span>Humidity</span>
                </div>
            </div>

            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>3.6 Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Wheather
