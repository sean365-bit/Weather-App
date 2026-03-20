import "../styles/Header.scss";
import { useState } from "react";
import { useUnits } from "../hooks";
import type { WeatherResponse } from "../types/ComponentTypes";
import logo from "../assets/images/logo.svg";
import unitsIcon from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
import rainIcon from "../assets/images/icon-rain.webp";
import Form from "./Form";
import Loading from "./Loading";

/* helper function */
const formatCurrentDate = () => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Header = function () {
  const [degre, setdegre] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDataFromChild = function (data: WeatherResponse) {
    setdegre(data);
    setLoading(false);
  };

  const handleLoadingStart = function () {
    setLoading(true);
  };

  return (
    <header>
      <Heading />
      <p className="heading_tittle">
        How's the <br className="heading_tittle_breaker" /> sky looking
        <br className="heading_tittle_breaker" /> today?
      </p>

      <Form
        onSearchResult={handleDataFromChild}
        onLoadingStart={handleLoadingStart}
      />

      <div className="desktop_version">
        <div className="desktop_left">
          {/* UI weather overview */}
          <div className="weather_overview">
            {loading ? (
              <Loading />
            ) : (
              degre && (
                <>
                  <div className="overview_specs">
                    <p className="weather_area">{degre.timezone}</p>
                    <p className="weather_date">{formatCurrentDate()}</p>
                  </div>
                  <p className="degrees">{degre.current.temperature_2m}°</p>
                </>
              )
            )}
          </div>

          {/* UI weather stats */}
          <div className="weather_stats">
            <div className="stats_card">
              <p className="stats_tittle">Feels Like</p>
              <div className="stats_content">
                {loading ? (
                  <Loading />
                ) : (
                  degre && <p>{degre.current.apparent_temperature}°</p>
                )}
              </div>
            </div>

            <div className="stats_card">
              <p className="stats_tittle">Humidity</p>
              <div className="stats_content">
                {loading ? (
                  <Loading />
                ) : (
                  degre && <p>{degre.current.relative_humidity_2m} %</p>
                )}
              </div>
            </div>

            <div className="stats_card">
              <p className="stats_tittle">Wind</p>
              <div className="stats_content">
                {loading ? (
                  <Loading />
                ) : (
                  degre && <p>{degre.current.wind_speed_10m} Km/h</p>
                )}
              </div>
            </div>

            <div className="stats_card">
              <p className="stats_tittle">Precipitation</p>
              <div className="stats_content">
                {loading ? (
                  <Loading />
                ) : (
                  degre && <p>{degre.current.precipitation} mm</p>
                )}
              </div>
            </div>
          </div>

          {/* UI daily forecast */}
          <p className="daily_forecast_title">Daily Forecast</p>
          <div className="daily_forecast_container">
            <div className="forecast_card">
              <p className="forecast_day">Tue</p>

              <img
                src={rainIcon}
                alt="icon"
                className="forecast_icon"
                loading="lazy"
              />

              <div className="degree">
                <p className="first_degree">20°</p>
                <p className="second_degree">14°</p>
              </div>
            </div>

            <div className="forecast_card">
              <p className="forecast_day">Tue</p>

              <img
                src={rainIcon}
                alt="icon"
                className="forecast_icon"
                loading="lazy"
              />

              <div className="degree">
                <p className="first_degree">20°</p>
                <p className="second_degree">14°</p>
              </div>
            </div>

            <div className="forecast_card">
              <p className="forecast_day">Tue</p>

              <img
                src={rainIcon}
                alt="icon"
                className="forecast_icon"
                loading="lazy"
              />

              <div className="degree">
                <p className="first_degree">20°</p>
                <p className="second_degree">14°</p>
              </div>
            </div>

            <div className="forecast_card">
              <p className="forecast_day">Tue</p>

              <img
                src={rainIcon}
                alt="icon"
                className="forecast_icon"
                loading="lazy"
              />

              <div className="degree">
                <p className="first_degree">20°</p>
                <p className="second_degree">14°</p>
              </div>
            </div>

            <div className="forecast_card">
              <p className="forecast_day">Tue</p>

              <img
                src={rainIcon}
                alt="icon"
                className="forecast_icon"
                loading="lazy"
              />

              <div className="degree">
                <p className="first_degree">20°</p>
                <p className="second_degree">14°</p>
              </div>
            </div>

            <div className="forecast_card">
              <p className="forecast_day">Tue</p>

              <img
                src={rainIcon}
                alt="icon"
                className="forecast_icon"
                loading="lazy"
              />

              <div className="degree">
                <p className="first_degree">20°</p>
                <p className="second_degree">14°</p>
              </div>
            </div>

            <div className="forecast_card">
              <p className="forecast_day">Tue</p>

              <img
                src={rainIcon}
                alt="icon"
                className="forecast_icon"
                loading="lazy"
              />

              <div className="degree">
                <p className="first_degree">20°</p>
                <p className="second_degree">14°</p>
              </div>
            </div>
          </div>
        </div>

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

/*
async function getLocationName(lat: number, lon: number) {
  const url = new URL(
    "https://api.bigdatacloud.net/data/reverse-geocode-client",
  );
  url.searchParams.set("latitude", lat.toString());
  url.searchParams.set("longitude", lon.toString());
  url.searchParams.set("localityLanguage", "en");

  const response = await fetch(url.toString());
  const data = await response.json();

  return {
    city: data.city || "",
    country: data.countryName || "",
  };
}
*/

/* helper function to get LAT and LON */
/*
const getGeolocation = function (): Promise<{
  latitude: number;
  longitude: number;
}> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
    );
  });
};*/

export default Header;
