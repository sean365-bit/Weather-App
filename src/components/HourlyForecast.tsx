import type {
  HourlyForecastProps,
  HourlyForecastCardProps,
} from "../types/ComponentTypes";
import { getWeatherIcon, formatHour } from "../utils/weatherHelpers";

function HourlyForecast({
  weatherData,
  loading,
  notFound,
}: HourlyForecastProps) {
  if (loading)
    return (
      <div className="hourly_forecast_container">
        <p className="daily_forecast_title">Hourly Forecast</p>

        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="hourly_forecast_content" />
        ))}
      </div>
    );

  if (!weatherData || notFound) return null;

  const { time, temperature_2m, weather_code } = weatherData.hourly;

  const startIndex = 8;
  const endIndex = 16;

  return (
    <div className="hourly_forecast_container">
      <p className="daily_forecast_title">Hourly Forecast</p>

      {time.slice(startIndex, endIndex).map((hourlyTime, index) => {
        const dataIndex = startIndex + index;
        return (
          <HourlyForecastCard
            key={hourlyTime}
            time={hourlyTime}
            temperature={temperature_2m[dataIndex]}
            weatherCode={weather_code[dataIndex]}
          />
        );
      })}
    </div>
  );
}

function HourlyForecastCard({
  time,
  temperature,
  weatherCode,
}: HourlyForecastCardProps) {
  const icon = getWeatherIcon(weatherCode);

  return (
    <div className="hourly_forecast_content">
      <div className="hour_heading">
        <img src={icon} alt="icon" className="hourly_icon" loading="lazy" />

        <p className="hour">{formatHour(time)}</p>
      </div>
      <p className="hourly_degree">{temperature}°C</p>
    </div>
  );
}

export default HourlyForecast;
