import type { WeatherOverviewProps } from "../types/ComponentTypes";
import Loading from "./Loading";
import {
  formatCityName,
  formatCurrentDate,
  getWeatherIcon,
} from "../utils/weatherHelpers";

const WeatherOverview = function ({
  weatherData,
  loading,
  error,
  cityName,
}: WeatherOverviewProps) {
  return (
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
              <img
                className="overview_icon"
                src={getWeatherIcon(weatherData.current.weather_code)}
                alt="Weather Icon"
              />
              {weatherData.current.temperature_2m}°
            </p>
          </>
        )
      )}
    </div>
  );
};

export default WeatherOverview;
