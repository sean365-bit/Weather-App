import type { hourlyForecastProps } from "../types/ComponentTypes";
import { getWeatherIcon } from "../utils/weatherHelpers";

const formatHour = (isoTime: string): string => {
  const date = new Date(isoTime);
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12; // converts 0 → 12, 13 → 1, etc.
  const period = hours24 >= 12 ? "PM" : "AM";
  return `${hours12} ${period}`;
};

function HourlyForecast({ weatherData }: hourlyForecastProps) {
  return (
    <div className="hourly_forecast_container">
      <p className="daily_forecast_title">Hourly Forecast</p>

      {weatherData?.hourly.time.slice(8, 16).map((time, index) => {
        const icon = getWeatherIcon(weatherData.hourly.weather_code[index]);

        return (
          <div className="hourly_forecast_content" key={time}>
            <div className="hour_heading">
              <img
                src={icon}
                alt="icon"
                className="hourly_icon"
                loading="lazy"
              />

              <p className="hour">{formatHour(time)}</p>
            </div>
            <p className="hourly_degree">
              {weatherData?.hourly.temperature_2m[index]}°C
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default HourlyForecast;
