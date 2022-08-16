import axios from 'axios';
import { useEffect, useState } from 'react';

const weatherCodes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    43: 'Fog',
    45: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall', 
    77: 'Snow grains', 	
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers', 
    85: 'Slight snow showers',
    86: 'Heavy snow showers',	 
    95: 'Thunderstorm', 
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
}

const CountryMulti = ({countries, setSearch}) => {
    const handleShowButton = (name) => () => {
        setSearch(name);
    };

    return (
        <div>
            {countries.map(country => {
                return (
                    <div key={country.name}>
                        <p>{country.name} <button onClick={handleShowButton(country.name)}>show</button></p>
                    </div>
                )               
            })}
        </div>
    )
};

const Weather = ({country, latlng}) => {
    const [temp, setTemp] = useState(0);
    const [wc, setWc] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);

    const weatherHook = () => {
        const url = 'https://api.open-meteo.com/v1/forecast?'
            .concat("latitude=", latlng[0])
            .concat("&longitude=", latlng[1])
            .concat("&current_weather=true")
            .concat("&windspeed_unit=ms");

        axios
            .get(url)
            .then(res => {
                setTemp(res.data.current_weather.temperature);
                setWc(res.data.current_weather.weathercode);
                setWindSpeed(res.data.current_weather.windspeed);
            });
    }
    useEffect(weatherHook);

    return (
        <>
            <h2>Weather in {country}</h2>
            <div>
                <p>{`temperature ${temp} Celsius`}</p>
                <p>{`condition ${weatherCodes[wc]}`}</p>
                <p>{`wind ${windSpeed} m/s`}</p>
            </div>
        </>
    )
}

const CountrySingle = ({country}) => {
    const {name, area, capital, languages, flag, latlng} = country;
    
    return (
        <div>
            <h2>{name}</h2>
            <p>capital {capital}</p>
            <p>area {area}</p>
            <h3>languages:</h3>
            <ul>
                {languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
            </ul>
            <img src={flag} alt={`flag of ${name}`} />
            <Weather country={name} latlng={latlng} />
        </div>
    );
};

const Countries = ({countries, setSearch}) => {
    return countries.length > 10
        ? <div>Too many matches, specify another filter</div>
        : countries.length === 0
            ? <div>No matches, specify another filter</div>
            : countries.length === 1
                ? <CountrySingle country={countries[0]} />
                : <CountryMulti countries={countries} setSearch={setSearch} />;
};

export default Countries;