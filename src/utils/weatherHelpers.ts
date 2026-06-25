import sunIcon from "../assets/images/icon-sunny.webp";
import partlyCloudyIcon from "../assets/images/icon-partly-cloudy.webp";
import cloudyIcon from "../assets/images/icon-overcast.webp";
import fogIcon from "../assets/images/icon-fog.webp";
import drizzleIcon from "../assets/images/icon-drizzle.webp";
import rainIcon from "../assets/images/icon-rain.webp";
import snowIcon from "../assets/images/icon-snow.webp";
import thunderstormIcon from "../assets/images/icon-storm.webp";

export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

export const formatCurrentDate = () => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getWeatherIcon = function (code: number): string {
  if (code === 0) return sunIcon; // icon-sunny
  if (code === 1) return sunIcon; // icon-sunny
  if (code <= 2) return partlyCloudyIcon; // icon-partly-cloudy
  if (code === 3) return cloudyIcon; // icon-overcast
  if (code >= 45 && code <= 48) return fogIcon; // icon-fog
  if (code >= 51 && code <= 57) return drizzleIcon; // icon-drizzle
  if (code >= 61 && code <= 67) return rainIcon; // icon-rain
  if (code >= 71 && code <= 77) return snowIcon; // icon-snow
  if (code >= 80 && code <= 82) return rainIcon; // icon-rain
  if (code >= 85 && code <= 86) return snowIcon; // icon-snow
  if (code >= 95 && code <= 99) return thunderstormIcon; // icon-storm
  return sunIcon; // fallback
};

export const formatCityName = (city: string) => {
  return city
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export async function getLocationName(lat: number, lon: number) {
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

/* helper function to get LAT and LON */
export const getGeolocation = function (): Promise<{
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
};
