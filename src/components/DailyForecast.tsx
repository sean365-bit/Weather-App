import type {
  DailyForecastProps,
  ForecastCardProps,
} from "../types/ComponentTypes";
import { getWeatherIcon } from "../utils/weatherHelpers";
import { useMemo } from "react";

function DailyForecast({ weatherData, loading, notFound }: DailyForecastProps) {
  if (loading)
    return (
      <>
        <p className="daily_forecast_title">Daily Forecast</p>
        <div className="daily_forecast_container">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="forecast_card" />
          ))}
        </div>
      </>
    );

  if (!weatherData || notFound) return null;

  const { time, weather_code, temperature_2m_max, temperature_2m_min } =
    weatherData.daily;

  return (
    <>
      <p className="daily_forecast_title">Daily Forecast</p>
      <div className="daily_forecast_container">
        {time.map((dateStr, index) => (
          <ForecastCard
            key={dateStr}
            dateStr={dateStr}
            weatherCode={weather_code[index]}
            maxTemp={temperature_2m_max[index]}
            minTemp={temperature_2m_min[index]}
          />
        ))}
      </div>
    </>
  );
}

function ForecastCard({
  dateStr,
  weatherCode,
  maxTemp,
  minTemp,
}: ForecastCardProps) {
  const dayLabel = useMemo(
    () =>
      new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
      }),
    [dateStr],
  );

  const icon = getWeatherIcon(weatherCode);

  return (
    <div className="forecast_card">
      <p className="forecast_day">{dayLabel}</p>
      <img
        src={icon}
        alt={`Weather icon for ${dayLabel}`}
        className="forecast_icon"
        loading="lazy"
      />
      <div className="daily_temperatures">
        <p className="high_temperature">{maxTemp}°</p>
        <p className="low_temperature">{minTemp}°</p>
      </div>
    </div>
  );
}

export default DailyForecast;
