import "../styles/Form.scss";
import { useState } from "react";
import type { WeatherResponse } from "../types/ComponentTypes";
import search from "../assets/images/icon-search.svg";

interface FormProps {
  onSearchResult: (data: WeatherResponse, city: string) => void;
  onLoadingStart: () => void;
  onError?: (error: string) => void; // Optional error handler
}

// function, from name to longitude and latitude
const searchForCity = async function (city: string) {
  try {
    const baseUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
    const response = await fetch(baseUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const result = data.results[0];

      const coordinates = {
        latitude: result.latitude,
        longitude: result.longitude,
      };

      return coordinates;
    }

    return null;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

// function, from longitude and latitude to forecast
const fetchWeatherData = async (latitude: number, longitude: number) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

const Form = function ({ onSearchResult, onLoadingStart, onError }: FormProps) {
  const [country, setCountry] = useState("");

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setCountry(e.target.value);
  };

  const handleSubmit = async function (e: React.FormEvent) {
    e.preventDefault();

    if (!country.trim()) return;

    onLoadingStart(); //

    try {
      const result = await searchForCity(country);

      if (!result) {
        onError?.("No search result found!");

        setCountry("");
        return;
      }

      const stats = await fetchWeatherData(result.latitude, result.longitude);
      console.log(stats);

      // onSearchResult(stats);
      onSearchResult(stats, country);
      setCountry("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      onError?.("Failed to fetch weather data. Please try again.");
    }
  };

  return (
    <form className="search_form" onSubmit={handleSubmit}>
      <label className="input_wrapper">
        <img src={search} alt="icon" className="search_icon" />
        <input
          type="text"
          placeholder="Search for a place..."
          name="place"
          value={country}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Search</button>
    </form>
  );
};

export default Form;
