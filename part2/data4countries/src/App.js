import { useEffect, useState } from "react";
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  const countriesHook = () => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(res => {
        setCountries(res.data);
      });
  }
  useEffect(countriesHook, []);

  const foundCountries = countries
    .filter(country => country.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <main>
      <SearchBar setSearch={setSearch} />
      <Countries countries={foundCountries} setSearch={setSearch} />
    </main>
  )
}

export default App;