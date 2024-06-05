import { useNavigate } from "react-router";

import "../../css/styles.css";
import PropTypes from "prop-types";

export default function CountriesCards({ mode, filteredDataBySearch }) {
  const navigate = useNavigate();

  function handleCardClick(name) {
    navigate(`/${name}`);
  }
  return (
    <div className={`cardContainer`}>
      {filteredDataBySearch.length > 0 ? (
        filteredDataBySearch.map((country, index) => {
          return (
            <div
              key={index}
              className={`card ${mode}`}
              onClick={() => handleCardClick(country.name)}
            >
              <img
                src={country.flags.png}
                alt={country.name}
                className="countryImg"
              />
              <div className={`countryInfo ${mode}`}>
                <h3 className={`countryName`}>{country.name}</h3>
                <p className={`countryDetails`}>
                  Population: <span>{country.population.toLocaleString()}</span>
                </p>
                <p className={`countryDetails`}>
                  Region: <span>{country.region}</span>
                </p>
                <p className={`countryDetails`}>
                  Capital: <span>{country.capital}</span>
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className={`noResults`}>
          <h1 className={`noResultsHeader ${mode}`}>No Results</h1>
        </div>
      )}
    </div>
  );
}

CountriesCards.propTypes = {
  mode: PropTypes.string.isRequired,
  filteredDataBySearch: PropTypes.array.isRequired,
};
