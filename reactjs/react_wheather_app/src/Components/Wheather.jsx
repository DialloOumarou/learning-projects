import React, { useEffect,useState,useRef} from 'react'
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

    const inputRef = useRef();
    const [wheather_data, setWheather_data] = useState(false);
    const all_icons = {
        '01d': clear_icon,
        '01n': clear_icon,
        '02d': cloud_icon,
        '02n': cloud_icon,
        '03d': cloud_icon,
        '03n': cloud_icon,
        '04d': drizzle_icon,
        '04n': drizzle_icon,
        '09d': rain_icon,
        '09n': rain_icon,
        '10d': rain_icon,
        '10n': rain_icon,
        '13d': snow_icon,
        '13n': snow_icon,
    }

    const search = async(city)=>{

        if(city === ""){
            alert('Please enter a city name');
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            
            const res = await fetch(url);
            const data = await res.json();

            if(!res.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = all_icons[data.weather[0].icon] || clear_icon;
            setWheather_data({
                temperature: Math.floor(data.main.temp),
                location: data.name,
                humidity: data.main.humidity,
                wind_speed: data.wind.speed,
                icon: icon
            });
        } catch (error) {
            setWheather_data(false);
            console.error('Error in fetching wheatherdata',error);
        }
    }

    useEffect(() => {
        search('New York');
    }, [])

  return (
   
    <div className="wheather">
        <div className="search_bar">
            <input ref={inputRef} type="text" name="" id="" placeholder='Search' />
            <img src={search_icon} alt="p" className='wheather_icon' onClick={()=>search(inputRef.current.value)} />
        </div>
        
        {wheather_data?  
        <>
            <img src={wheather_data.icon} alt="" />
            <p className='temperature'>{wheather_data.temperature}°C</p>
            <p className='location'>{wheather_data.location}</p>

            <div className="wheather_data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{wheather_data.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>

                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{wheather_data.wind_speed} Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </>:<></>}

        
    </div>
    
  )
}

export default Wheather
