import type { dailyForecastProps } from "../types/ComponentTypes";
import Loading from "./Loading";

import sunIcon from "../assets/images/icon-sunny.webp";
import partlyCloudyIcon from "../assets/images/icon-partly-cloudy.webp";
import cloudyIcon from "../assets/images/icon-overcast.webp";
import fogIcon from "../assets/images/icon-fog.webp";
import drizzleIcon from "../assets/images/icon-drizzle.webp";
import rainIcon from "../assets/images/icon-rain.webp";
import snowIcon from "../assets/images/icon-snow.webp";
import thunderstormIcon from "../assets/images/icon-storm.webp";

const getWeatherIcon = (code: number): string => {
  if (code === 0) return sunIcon;
  if (code <= 2) return partlyCloudyIcon;
  if (code === 3) return cloudyIcon;
  if (code >= 45 && code <= 48) return fogIcon;
  if (code >= 51 && code <= 57) return drizzleIcon;
  if (code >= 61 && code <= 67) return rainIcon;
  if (code >= 71 && code <= 77) return snowIcon;
  if (code >= 80 && code <= 82) return rainIcon; // showers
  if (code >= 85 && code <= 86) return snowIcon; // snow showers
  if (code >= 95 && code <= 99) return thunderstormIcon;
  return sunIcon; // fallback
};

function DailyForecast({ weatherData, loading }: dailyForecastProps) {
  return (
    <>
      <p className="daily_forecast_title">Daily Forecast</p>
      <div className="daily_forecast_container">
        {loading ? (
          <Loading />
        ) : (
          weatherData &&
          weatherData.daily.time.map((dateStr, index) => {
            const dayLabel = new Date(`${dateStr}T00:00:00`).toLocaleDateString(
              "en-US",
              { weekday: "short" },
            );

            const icon = getWeatherIcon(weatherData.daily.weather_code[index]);

            return (
              <div className="forecast_card" key={dateStr}>
                <p className="forecast_day">{dayLabel}</p>

                <img
                  src={icon}
                  alt="icon"
                  className="forecast_icon"
                  loading="lazy"
                />

                <div className="daily_temperatures">
                  <p className="high_temperature">
                    {weatherData.daily.temperature_2m_max[index]}°
                  </p>
                  <p className="low_temperature">
                    {weatherData.daily.temperature_2m_min[index]}°
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default DailyForecast;
