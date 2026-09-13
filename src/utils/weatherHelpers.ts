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

export const formatCurrentDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const WEATHER_ICON_MAP = [
  { range: [0, 1], icon: sunIcon },
  { range: [2, 2], icon: partlyCloudyIcon },
  { range: [3, 3], icon: cloudyIcon },
  { range: [45, 48], icon: fogIcon },
  { range: [51, 57], icon: drizzleIcon },
  { range: [61, 67], icon: rainIcon },
  { range: [71, 77], icon: snowIcon },
  { range: [80, 82], icon: rainIcon },
  { range: [85, 86], icon: snowIcon },
  { range: [95, 99], icon: thunderstormIcon },
];

export const getWeatherIcon = (code: number): string => {
  const match = WEATHER_ICON_MAP.find(
    ({ range: [min, max] }) => code >= min && code <= max,
  );

  if (!match) {
    console.warn(`Unrecognized weather code: ${code}`);
    return sunIcon;
  }

  return match.icon;
};

export const formatHour = (isoTime: string): string => {
  const date = new Date(isoTime);
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12; // converts 0 → 12, 13 → 1, etc.
  const period = hours24 >= 12 ? "PM" : "AM";
  return `${hours12} ${period}`;
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
