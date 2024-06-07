import React, { useEffect, useState } from "react";
import "./board-admin.component.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import usePokemon from '../hooks/usePokemon';


function Home() {
  const APP_ID = "56d2950b57ada689203309ff63bf6d57";
  const [actual, setActual] = useState('https://pokeapi.co/api/v2/pokemon?limit=12&offset=0');
  const { pokemones, loading } = usePokemon(actual);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [humedad, setHumedad] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [date, setDate] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [tempMin, setTempMin] = useState('');

  useEffect(() => {
    getCoords();
    onLoad();
  }, []);

  const getCoords = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userArray = position.coords;
      const ubicacion = {
        latitud: userArray.latitude,
        longitud: userArray.longitude,
      };
      localStorage.setItem("ubicacion", JSON.stringify(ubicacion));
    });
  };

  const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
  };

  const fetchData = (position) => {
    const { latitude, longitude } = position.coords;
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data));
      
  };

  const setWeatherData = (data) => {
    console.log(data);
      setLocation(data.name);
      setDate(getDate());
      setTemperatura(Math.floor(data.main.temp));
      setTempMax(data.main.temp_max);
      setTempMin(data.main.temp_min);
      setHumedad(data.main.humidity);
      setDescription(data.weather[0].main);
  };

  const getDate = () => {
    let date = new Date();
    return `${date.getDate() + 1}-${("0" + (date.getMonth() + 1)).slice(
      -2
    )}-${date.getFullYear()}`;
  };

  return (
    loading ?
    <p>Cargando pokemones...</p>
  :
    <div className="container" style={{marginTop: '-10px'}}>
      <header className="jumbotron">
        <h3>Clima</h3>
        <p>Locación: {location}</p>
        <p>Fecha dia siguiente: {date}</p>
        <p>Temp. Actual: {temperatura}</p>
        <p>Temp. Min: {tempMin}</p>
        <p>Temp. Max: {tempMax}</p>
        <p>Humedad: {humedad}</p>
        <p>Descripción: {description}</p>
      </header>
     
        <div className="jumbotron conteiner" style={{marginTop: '-10px'}}>
            <ul>        
                {pokemones.map((pokemon, index) => {
                    return <li key={index}>{pokemon.name}</li>
                })}
            </ul>
        </div>
    </div>
  );
}
export default Home;
