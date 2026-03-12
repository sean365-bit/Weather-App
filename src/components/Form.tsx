import "../styles/Form.scss";
import { useState } from "react";
import search from "../assets/images/icon-search.svg";

interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
  hourly_units?: {
    temperature_2m: string;
  };
}

interface WeatherData {
  hourly: {
    temperature_2m: number[];
    time: string[];
    // add other properties as needed
  };
  // add other top-level properties as needed
}

interface FormProps {
  onSearchResult: (data: WeatherData) => void;
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
const fetchWeatherData = async (
  latitude: number,
  longitude: number,
): Promise<WeatherResponse> => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WeatherResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

const Form = function ({ onSearchResult }: FormProps) {
  const [country, setCountry] = useState("");

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setCountry(e.target.value);
  };

  const handleSubmit = async function (e: React.FormEvent) {
    e.preventDefault();

    if (!country.trim()) return;

    const result = await searchForCity(country);

    const stats = await fetchWeatherData(result?.latitude, result?.longitude);

    onSearchResult(stats);
    setCountry("");
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
