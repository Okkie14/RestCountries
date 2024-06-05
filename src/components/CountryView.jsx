import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import data from "../../data.json";
import NavBar from "./Countries/navBar";
import "../css/styles.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CountryView({ mode, setMode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const country = data.find((country) => country.name === id);

  function goBack() {
    navigate("/");
  }

  function goToCountry(country) {
    navigate(`/${country}`);
  }

  const borderCountries = country.borders;

  const borderCountriesList = data.filter((country) => {
    return borderCountries?.includes(country.alpha3Code);
  });

  return (
    <main className={`countryViewMain ${mode}`}>
      <NavBar mode={mode} setMode={setMode} />
      <section className={`viewMain`}>
        <section>
          <div className="backBtnContainer">
            <button className={`backBtn ${mode}`} onClick={goBack}>
              <ArrowBackIcon /> Back
            </button>
          </div>
        </section>
        <section className="viewContainer">
          <div className="countryFlag">
            {/* Flag */}
            <img src={country.flag} alt={country.name} />
          </div>
          <div className={`countryInformationContainer ${mode}`}>
            <h1 className={`countryInformationHeader ${mode}`}>
              {country.name}
            </h1>
            <div className={`countryInformation ${mode}`}>
              {/* Info */}
              <p className={`countryInformationItem ${mode}`}>
                Native Name: <span>{country.nativeName}</span>
              </p>
              <p className={`countryInformationItem ${mode}`}>
                Top Level Domain: <span>{country.topLevelDomain}</span>
              </p>
              <p className={`countryInformationItem ${mode}`}>
                Population: <span>{country.population.toLocaleString()}</span>
              </p>
              <p className={`countryInformationItem ${mode}`}>
                Currencies:{" "}
                {country.currencies?.map((name, index) => (
                  <span key={index}>
                    {name.name} ({name.symbol})
                  </span>
                ))}
              </p>
              <p className={`countryInformationItem ${mode}`}>
                Region: <span>{country.region}</span>
              </p>
              <p className={`countryInformationItem ${mode}`}>
                Languages:{" "}
                {country.languages.map((name, index) => (
                  <span key={index}>{name.name} </span>
                ))}
              </p>
              <div>
                <p className={`countryInformationItem ${mode}`}>
                  Sub Region: <span>{country.subregion}</span>
                </p>
                <p className={`countryInformationItem ${mode}`}>
                  Capital: <span>{country.capital}</span>
                </p>
              </div>
            </div>
            <div className="borders">
              {borderCountriesList.length > 0 ? (
                <>
                  <p className={`countryInformationItem ${mode}`}>
                    Border Countries:
                  </p>
                  {borderCountriesList.map((country, index) => (
                    <button
                      className={`borderBtn ${mode}`}
                      onClick={() => goToCountry(country.name)}
                      key={index}
                    >
                      {country.name}
                    </button>
                  ))}
                </>
              ) : (
                <p className={`countryInformationItem ${mode}`}>Island</p>
              )}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

CountryView.propTypes = {
  mode: PropTypes.string,
  setMode: PropTypes.func,
};
