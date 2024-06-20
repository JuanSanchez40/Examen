import React, { useEffect, useState } from "react";
import "./board-admin.component.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import usePokemon from "../hooks/usePokemon";
import { render } from "@testing-library/react";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

function Home() {
  const APP_ID = "56d2950b57ada689203309ff63bf6d57";
  const [actual, setActual] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"
  );
  const { pokemones, loading } = usePokemon(actual);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [humedad, setHumedad] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [date, setDate] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [checkedState, setCheckedState] = useState(false);
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
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
      setLocation(data.name);
      setDate(getDate());
      setTemperatura(Math.floor(data.main.temp));
      setTempMax(data.main.temp_max);
      setTempMin(data.main.temp_min);
      setHumedad(data.main.humidity);
      setDescription(data.weather[0].main);

      const userArray = data.coord;
      const ubicacion = {
        latitud: userArray.lat,
        longitud: userArray.lon,
      };
      localStorage.setItem("ubicacion", JSON.stringify(ubicacion));
    };
    setActual("https://pokeapi.co/api/v2/pokemon?limit=12&offset=0");
    onLoad();
  }, []);

  const getDate = () => {
    let date = new Date();
    return `${date.getDate() + 1}-${("0" + (date.getMonth() + 1)).slice(
      -2
    )}-${date.getFullYear()}`;
  };

  useEffect(() => {
    localStorage.setItem("pockeList", JSON.stringify(dataArray));
  }, [dataArray]);

  const handleOnChange = (e) => {
    console.log(e);
    if (e.target.checked === true) {
      setDataArray([...dataArray, e.target.value]);
    } else if (e.target.checked === false) {
      let freshArray = dataArray.filter((val) => val !== e.target.value);
      setDataArray([...freshArray]);
    }
  };

  const handleClearButton = () => {
    
      console.log(checkedState);
     setCheckedState(false);
  }

  return loading ? (
    <p>Cargando pokemones...</p>
  ) : (
    <div className="container">
    <div style={{ marginTop: "-10px", marginLeft: '30%' }}>
      <Sheet variant="outlined" sx={{ p: 2, borderRadius: 'sm', width: 300 }}>
        <h3>Clima</h3>
        <p>Locación: {location}</p>
        <p>Fecha dia siguiente: {date}</p>
        <p>Temp. Actual: {temperatura} °C</p>
        <p>Temp. Min: {tempMin} °C</p>
        <p>Temp. Max: {tempMax} °C</p>
        <p>Humedad: {humedad}</p>
        <p>Descripción: {description}</p>
        </Sheet>
        </div>
       <div style={{ marginTop: "-10px", marginLeft: '30%' }}>
      <Sheet variant="outlined" sx={{ p: 2, borderRadius: 'sm', width: 300 }}>
      <Typography
          id="filter-status"
          sx={{
            textTransform: "uppercase",
            fontSize: "xs",
            letterSpacing: "lg",
            fontWeight: "lg",
            color: "text.secondary",
            mb: 2,
          }}
        >
          Pokemon List
        </Typography>


        <div role="group" aria-labelledby="filter-status">
        <List>
          <ListItem variant="soft" color="danger">

        <ul className="pokemones-list">
          {pokemones.map(({ name }, index) => {
            return (
              
              <li key={index}>
                <div className="pokemones-list-item">
                  <div className="left-section">
                    <Checkbox 
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={name}
                      checked={checkedState[index]}
                      onChange={handleOnChange}
                      disabled={dataArray.length >= 6}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        </ListItem>
        </List>
        </div>
        <Button
        variant="outlined"
        color="neutral"
        size="sm"
        onClick={
          handleClearButton
        }
        sx={{ px: 1.5, mt: 1 }}
      >
        Clear All
      </Button>
        </Sheet>
      </div>
      </div>
      
       
    
  );
}
export default Home;
