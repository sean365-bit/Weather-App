import "../styles/Header.scss";
import { useState } from "react";
import { useUnits } from "../hooks";
import { formatCurrentDate, formatCityName } from "../utils/weatherHelpers";
import type { WeatherResponse } from "../types/ComponentTypes";
import logo from "../assets/images/logo.svg";
import unitsIcon from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
import Form from "./Form";
import Loading from "./Loading";
import StatCard from "./StatCard";
import DailyForecast from "./DailyForecast";

import rainIcon from "../assets/images/icon-rain.webp";

const Header = function () {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);

  const handleDataFromChild = function (data: WeatherResponse, city: string) {
    setWeatherData(data);
    setCityName(city);
    setLoading(false);
    setError(null);
  };

  const handleLoadingStart = function () {
    setLoading(true);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setLoading(false);
  };

  return (
    <header>
      <Heading />
      <p className="heading_title">
        How's the <br className="heading_title_breaker" /> sky looking
        <br className="heading_title_breaker" /> today?
      </p>

      <Form
        onSearchResult={handleDataFromChild}
        onLoadingStart={handleLoadingStart}
        onError={handleError}
      />

      <div className="desktop_version">
        <div className="desktop_left">
          {/* UI weather overview */}
          <div className="weather_overview">
            {loading ? (
              <Loading />
            ) : error ? (
              <p className="error_message">{error}</p>
            ) : (
              weatherData && (
                <>
                  <div className="overview_specs">
                    <p className="weather_area">
                      {cityName && formatCityName(cityName)}
                    </p>
                    <p className="weather_date">{formatCurrentDate()}</p>
                  </div>
                  <p className="degrees">
                    {weatherData.current.temperature_2m}°
                  </p>
                </>
              )
            )}
          </div>

          <div className="weather_stats">
            <StatCard
              title="Feels Like"
              value={weatherData?.current.apparent_temperature}
              unit="°"
              loading={loading}
            />

            <StatCard
              title="Humidity"
              value={weatherData?.current.relative_humidity_2m}
              unit="%"
              loading={loading}
            />

            <StatCard
              title="Wind"
              value={weatherData?.current.wind_speed_10m}
              unit="Km/h"
              loading={loading}
            />

            <StatCard
              title="Precipitation"
              value={weatherData?.current.precipitation}
              unit="mm"
              loading={loading}
            />
          </div>

          {/* daily forecast */}
          <DailyForecast weatherData={weatherData} loading={loading} />
        </div>

        {/* desktop_right */}
        <div className="desktop_right">
          {/* UI Hourly Forecast */}
          <div className="hourly_forecast_container">
            <div className="hourly_forecast_content">
              <div className="hour_heading">
                <img
                  src={rainIcon}
                  alt="icon"
                  className="hourly_icon"
                  loading="lazy"
                />
                <div className="hour">3 PM</div>
              </div>

              <p className="hourly_degree">20°</p>
            </div>

            <div className="hourly_forecast_content">
              <div className="hour_heading">
                <img
                  src={rainIcon}
                  alt="icon"
                  className="hourly_icon"
                  loading="lazy"
                />
                <div className="hour">3 PM</div>
              </div>

              <p className="hourly_degree">20°</p>
            </div>

            <div className="hourly_forecast_content">
              <div className="hour_heading">
                <img
                  src={rainIcon}
                  alt="icon"
                  className="hourly_icon"
                  loading="lazy"
                />
                <div className="hour">3 PM</div>
              </div>

              <p className="hourly_degree">20°</p>
            </div>

            <div className="hourly_forecast_content">
              <div className="hour_heading">
                <img
                  src={rainIcon}
                  alt="icon"
                  className="hourly_icon"
                  loading="lazy"
                />
                <div className="hour">3 PM</div>
              </div>

              <p className="hourly_degree">20°</p>
            </div>

            <div className="hourly_forecast_content">
              <div className="hour_heading">
                <img
                  src={rainIcon}
                  alt="icon"
                  className="hourly_icon"
                  loading="lazy"
                />
                <div className="hour">3 PM</div>
              </div>

              <p className="hourly_degree">20°</p>
            </div>

            <div className="hourly_forecast_content">
              <div className="hour_heading">
                <img
                  src={rainIcon}
                  alt="icon"
                  className="hourly_icon"
                  loading="lazy"
                />
                <div className="hour">3 PM</div>
              </div>

              <p className="hourly_degree">20°</p>
            </div>

            <div className="hourly_forecast_content">
              <div className="hour_heading">
                <img
                  src={rainIcon}
                  alt="icon"
                  className="hourly_icon"
                  loading="lazy"
                />
                <div className="hour">3 PM</div>
              </div>

              <p className="hourly_degree">20°</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Heading = function () {
  const { isOpen, setIsOpen, wrapperRef } = useUnits();

  return (
    <div className="heading_header">
      <img src={logo} alt="App Logo" />

      <div className="dropdown_wrapper" ref={wrapperRef}>
        <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
          <img src={unitsIcon} alt="Units" />
          <p>Units</p>
          <img src={dropdownIcon} alt="Arrow" />
        </div>

        {isOpen && (
          <ul className="dropdown_menu">
            <li>Metric</li>
            <li>Imperial</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
