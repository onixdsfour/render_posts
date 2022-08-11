import './App.sass';
import Home from './pages/Home';
import Details from './pages/Details';
import {Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout';
import {useState} from 'react';

function App() {

  const [weather, setWeather] = useState();
  const [city, setCity] = useState();
  const [units, setUnits] = useState();

  const setTitle = (city, units) => document.title = `Weather in ${city} at ${units}`;

  const getWeather = value => {
    setWeather(value.weather);
    setCity(value.city);
    setUnits(value.units);

    setTitle(city, units);
  }
  
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home getWeather={getWeather} />}></Route>
          <Route path="details/:city/:units" element={<Details weather={weather} />}></Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
