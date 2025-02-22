import React, { useEffect, useState } from 'react'
import './weather.css'
import search_icon from '../assets/search.png'
import cloudy_icon from '../assets/cloudy.png'
import humidity_icon from '../assets/newhumidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import drizzle_icon from '../assets/drzzle.png'
import sunny_icon from '../assets/sunny.png'
import wind_icon from '../assets/wind.png'
function Weather() {
    const [record, setrecord] = useState(false)
    const [search, setsearch] = useState('')
    const allicon = {
        "01d": sunny_icon,
        "01n": sunny_icon,
        "02d": cloudy_icon,
        "02n": cloudy_icon,
        "03d": cloudy_icon,
        "03n": cloudy_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon


    }
    const Fetchdata = async (city) => {

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
            const icon = allicon[data.weather[0].icon] || sunny_icon
            setrecord({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        }
        catch (error) {
            // console.log(err)
        }
    }
    useEffect(() => {
        Fetchdata("New York")
    }, [])


    function Handlesearch(e) {
        setsearch(e.target.value)
    }
    function Handleclick() {
        if (search.trim) {
            Fetchdata(search)
        }
    }
    return (
        <>
            <div className='app'>
                <div className='weather'>
                    <div className='search-bar'>
                        <input type="text" placeholder='Search' onChange={Handlesearch} />
                        <img src={search_icon} alt="" onClick={Handleclick} />
                    </div>
                    <div className='data'>
                        <img src={record.icon} alt="" className='weather-icon' />
                        <p className='temperature'>{record.temperature}°c</p>
                        <p className='location'>{record.location}</p>
                    </div>
                    <div className='weather-data'>
                        <div className="col">
                            <img src={humidity_icon} alt="" />
                            <div>
                                <p>{record.humidity}</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="" />
                            <div>
                                <p>{record.windspeed}km/h</p>
                                <span>Wind speed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Weather
