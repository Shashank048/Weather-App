import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({updateInfo}) {
    let [city,setCity] = useState("");
    let [error, setError] = useState(false);

    const API_URL ="http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";

    const API_KEY ="4dcd43537a4dd6ca3ba701336a14d734";

    let getWeatherInfo = async() => {

        try{
            let response =  await fetch (`${API_KEY}?q=${city}&appid=${API_KEY}`);

      let jsonResponse = await response.json();

      let result = {

        city: city,

        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelslike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description, 
      };

      console.log(result);

      return result;
     }catch(err){
        throw err;
     }
    };

    

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = async(evt) => {
        try{
            evt.preventDefault();
            console.log(city);
            setCity("");
            let newinfo = await getWeatherInfo();
           updateInfo(newinfo);
        }catch(err){
            setError(true);   
        }
    };

    return(
        <div className="SearchBox">       
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange} /> 
            <br></br><br></br>
            <Button variant="contained" type="submit">Search</Button>
            {error && <p style={{color:"red"}}>No such place exists!  </p>}
            </form>
        </div>
    )
}
