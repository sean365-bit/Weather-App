import "../styles/Header.scss";
import { useState } from "react";
import { useUnits } from "../hooks";
import type { WeatherResponse } from "../types/ComponentTypes";
import logo from "../assets/images/logo.svg";
import unitsIcon from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
import Form from "./Form";

import StatCard from "./StatCard";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";

import WeatherOverview from "./WeatherOverview";

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
        <div>
          {/* UI weather overview */}
          <WeatherOverview
            weatherData={weatherData}
            loading={loading}
            error={error}
            cityName={cityName}
          />

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

        <div>
          <HourlyForecast weatherData={weatherData} />
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
