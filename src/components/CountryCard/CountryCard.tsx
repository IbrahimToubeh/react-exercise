import { Country } from '../../types';
import './CountryCard.css';

interface CountryCardProps {
  country: Country;
  onSelect: (country: Country) => void;
}

export default function CountryCard({ country, onSelect }: CountryCardProps) {
  return (
    <div className="country-card" onClick={() => onSelect(country)}>
      <img 
        src={country.flag} 
        alt={`${country.name} flag`} 
        className="country-card-flag"
      />
      <div className="country-card-body">
        <div className='country-card-name'>
          <h2>{country.name}</h2>
        </div>
        <div className='country-card-info'>
          <p>Population: {country.population?.toLocaleString() ?? 'Unknown'}</p>
          <p>Region: {country.region || 'Unknown'}</p>
          <p>Capital: {country.capital || 'Unknown / N/A'}</p>  
        </div>
      </div>
    </div>
  );
}