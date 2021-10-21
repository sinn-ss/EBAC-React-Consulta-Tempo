import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchForecastWeather = () => {
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_BASE_URL}current.json?key=${process.env.REACT_APP_KEY}&q=${city}&lang=pt`
      )
    .then(handleErrors)
    .then((response) => {
      if(response.status === 200){
        setError(false);
        return response.json();
      }
    })
    .then((data) => {
      setWeatherForecast(data);
    })
    .catch((error) => {
      return error;
    });
    setCity("");
    setLoading(false);
  }

  const handleErrors = (response) => {
    if(!response.ok) {
      setError(true);
      throw new Error(response.status);
    }
    return response;
  }

  const handleCityChange = (event) => {
    setCity(event.target.value);
  }

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <a className="navbar-brand" href="#search">
            EBAC Weather
          </a>
        </nav>

        <main className="container">
          <div className="jumbotron">
            <h1>Verifique agora a previsão do tempo na sua cidade!</h1>
            <p className="lead">
              Digite a sua cidade no campo abaixo e em seguida clique em
              "Pesquisar".
            </p>
            <div className="row mb-4">
              <div className="">
                <input 
                  type="text" 
                  className="form-control" 
                  value={city} 
                  onChange={handleCityChange}
                />
              </div>
            </div>
            <button
              className="btn btn-lg btn-primary"
              onClick={searchForecastWeather}
            >
              {loading ? "Aguarde..." : "Pesquisar"}
            </button>

            {
              error ? (
                <div className='mt-4'>
                  <div className='row'>
                    <h3>Ocorreu um erro. Tente novamente</h3>
                  </div>
                </div>
              ) : (
                weatherForecast ? (
                  <div className='mt-4'>
                    <div className='row'>
                      <h2>Agora em {weatherForecast.location.name}</h2>
                    </div>
                    <div className='row mb-4'>
                      <h4>
                        {weatherForecast.location.name}, {weatherForecast.location.region}, {weatherForecast.location.country}
                      </h4>
                    </div>
                    <div className='d-inline-flex p-2 bd-highlight'>
                      <div className='col ml-6'>
                        <h2>{weatherForecast.current.temp_c}°C</h2>
                      </div>
                      <div className='col ml-8'>
                        <img 
                          src={weatherForecast.current.condition.icon} 
                          width="65" 
                          height="65" 
                          alt="Weather Icon"
                        />
                      </div>
                      <div className='col ml-8'>
                        <p className='lead'>
                          {weatherForecast.current.condition.text}
                        </p>
                      </div>
                    </div> 
                    <div>
                      <p>
                        Velocidade do Vento: {weatherForecast.current.wind_kph} Km/h
                      </p>
                      <p>
                        Direção do vento: {weatherForecast.current.wind_dir}
                      </p>
                      <p>
                        Precipitação: {weatherForecast.current.precip_mm}mm
                      </p>
                      <p>
                        Umidade do ar: {weatherForecast.current.humidity}%
                      </p>
                      <p>
                        Sensação Térmica: {weatherForecast.current.feelslike_c}ºC
                      </p>
                    </div>
                  </div>
                ) : null
              )
            }
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
