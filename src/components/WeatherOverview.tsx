import type { WeatherOverviewProps } from "../types/ComponentTypes";
import Loading from "./Loading";
import {
  formatCityName,
  formatCurrentDate,
  getWeatherIcon,
} from "../utils/weatherHelpers";

function WeatherOverview({
  weatherData,
  loading,
  cityName,
  notFound,
}: WeatherOverviewProps) {
  if (loading)
    return (
      <div className="weather_overview_loading">
        <Loading />
      </div>
    );

  if (!weatherData || notFound) return null;

  const { time, weather_code, temperature_2m } = weatherData.current;

  return (
    <div className="weather_overview">
      <div className="overview_specs">
        <p className="weather_area">{cityName && formatCityName(cityName)}</p>
        <p className="weather_date">{formatCurrentDate(time)}</p>
      </div>

      <p className="degrees">
        <img
          className="overview_icon"
          src={getWeatherIcon(weather_code)}
          alt={`Weather condition: ${weather_code}`}
        />
        {temperature_2m}°
      </p>
    </div>
  );
}

export default WeatherOverview;
