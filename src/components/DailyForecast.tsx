import type { dailyForecastProps } from "../types/ComponentTypes";
import { getWeatherIcon } from "../utils/weatherHelpers";
import Loading from "./Loading";

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
