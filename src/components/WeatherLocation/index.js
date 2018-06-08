import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Location from './Location';
import WeatherData from './WeatherData';
import transformWeather from '../../services/transformWeather';
import './styles.css';

const location = 'Madrid,es';
const api_key = 'fd9f8faba77a517aba79eb2bb779f29c';
const api_weather = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`;

class WeatherLocation  extends Component {

    constructor() {
        super();
        this.state = {
            city: 'Madrid',
            data: null,
        }
        console.log('Constructor')
    }

    handleUpdateClick = () => {
        fetch(api_weather).then( data => {
            return data.json();
        }).then( weather_data => {
            const data = transformWeather(weather_data);
            this.setState({data});
        });
    }
    
    componentWillMount() {
        this.handleUpdateClick();
    }

    render = () => {
        console.log('Render')
        const { city, data } = this.state;
        return (
        <div className='weatherLocationCont'>
            <Location city={city}/>
            { data ? <WeatherData data={data}/> : 'Cargando' }
        </div>
        )
    }
};

WeatherLocation.propTypes = {
    data: PropTypes.shape({
        temperature: PropTypes.number.isRequired,
        weatherState: PropTypes.string.isRequired,
        humidity: PropTypes.number.isRequired,
        wind: PropTypes.string.isRequired,
    })
}

export default WeatherLocation;