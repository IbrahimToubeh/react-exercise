import { FaArrowLeft } from 'react-icons/fa';
import { Country } from '../types';
import './CountryDetailed.css';

interface CountryDetailedProps {
  country: Country;
  onBack: () => void;
  onSelectBorder: (code: string) => void;
}

export default function CountryDetailed({ country, onBack, onSelectBorder }: CountryDetailedProps) {
  return (
    <div className="country-detail-container">
      <button className="back-btn" onClick={onBack}>
        <FaArrowLeft /> Back
      </button>

      <div className="country-detail-content">
        <div className="country-flag-wrapper">
          <img
            src={country.flag || country.flags?.png || country.flags?.svg}
            alt={`${country.name} flag`}
            className="country-detail-flag"
          />
        </div>

        <div className="country-info-wrapper">
          <h2 className="country-title">{country.name}</h2>

          <div className="country-meta-grid">
            <div className="meta-column">
              <p><strong>Native Name:</strong> {country.nativeName || 'N/A'}</p>
              <p><strong>Population:</strong> {country.population?.toLocaleString() ?? 'N/A'}</p>
              <p><strong>Region:</strong> {country.region || 'N/A'}</p>
              <p><strong>Sub Region:</strong> {country.subregion || 'N/A'}</p>
              <p><strong>Capital:</strong> {country.capital || 'N/A'}</p>
            </div>

            <div className="meta-column">
              <p><strong>Top Level Domain:</strong> {country.topLevelDomain?.join(', ') || 'N/A'}</p>
              <p>
                <strong>Currencies:</strong>{' '}
                {country.currencies?.length
                  ? country.currencies.map((c) => c.name).join(', ')
                  : 'None'}
              </p>
              <p>
                <strong>Languages:</strong>{' '}
                {country.languages?.length
                  ? country.languages.map((l) => l.name).join(', ')
                  : 'None'}
              </p>
            </div>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="border-countries">
              <strong>Border Countries:</strong>
              <div className="border-tags">
                {country.borders.map((border: string) => (
                  <span key={border} className="border-tag" onClick={() => onSelectBorder(border)}>
                    {border}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}