import { useState, useEffect, useMemo } from 'react';
import { FaMoon, FaSun, FaSearch } from 'react-icons/fa';
import data from './data.json';
import { Country } from './types';
import CountryCard from './components/CountryCard/CountryCard';
import CountryDetailed from './components/CountryDetailed/CountryDetailed';
import './App.css';
import Modal from './components/modal/modal';

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];
const countries: Country[] = data;

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");


  const filteredCountries = useMemo(() => countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (region === "" || region === "All" || country.region === region)
  ), [searchTerm, region]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleSelectBorder = (code: string) => {
    const target = countries.find((c) => c.alpha3Code === code);
    if (target) {
      setSelectedCountry(target);
    }
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <p className="main-title">Where in the world?</p>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </header>

      <main className="content-container">
        <>
          <div className='filters-row'>
            <div className='search-box'>
              <FaSearch className='search-icon' />
              <input
                type='text'
                placeholder='Search for a country...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className='region-select' value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="" disabled hidden>Filter by Region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <section className="countries-grid">
            {filteredCountries.map((country: Country) => (
              <CountryCard
                key={country.name}
                country={country}
                onSelect={(chosen) => setSelectedCountry(chosen)}
              />
            ))}
          </section>
        </>
          <Modal isOpen = {selectedCountry != null}
          onClose={() => setSelectedCountry(null)}>
          {selectedCountry &&
            <CountryDetailed country={selectedCountry}
              onBack={() => setSelectedCountry(null)}
              onSelectBorder={handleSelectBorder} />}
        </Modal>
      </main>
    </div>
  );
}