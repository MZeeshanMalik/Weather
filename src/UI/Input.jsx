/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

const WeatherApiKey = `${import.meta.env.VITE_key}`;

function Input({ setCity }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestion] = useState(false);
  const [currentCity, setCurrentCity] = useState("");
  const [debouncedCity, setDebouncedCity] = useState("");

  // Debounce the currentCity input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(currentCity);
    }, 500); // Adjust the debounce delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [currentCity]);

  const handleChange = (e) => {
    setCurrentCity(e.target.value);
  };

  const handleSelect = (city) => {
    setCity(city.name);
    setShowSuggestion(false);
    setSuggestions([]);
  };

  useEffect(() => {
    if (debouncedCity.length > 2) {
      async function getCities() {
        try {
          const res = await fetch(
            `https://api.weatherapi.com/v1/search.json?key=${WeatherApiKey}&q=${debouncedCity}`
          );
          const data = await res.json();

          setSuggestions(data);
          setShowSuggestion(true);
        } catch (err) {
          console.error("Error fetching city", err);
        }
      }
      getCities();
    } else {
      setSuggestions([]);
      setShowSuggestion(false);
    }
  }, [debouncedCity]);

  return (
    <div className="flex justify-between items-center mb-6 relative flex-col">
      <div className="w-[90vh]">
        <input
          type="text"
          placeholder="Search for cities"
          onChange={handleChange}
          onBlur={() => setTimeout(() => setShowSuggestion(false), 100)}
          onFocus={() => setShowSuggestion(true)}
          className="bg-gray-700 p-2 rounded-lg w-full max-w-xs sm:max-w-[30rem]"
        />
      </div>
      {/* <div> */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="text-stone-800">
          <ul className="absolute bg-white border border-gray-300 w-auto mt-2 rounded shadow-lg z-10">
            {suggestions.map((city, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onMouseDown={() => handleSelect(city)} // Use onMouseDown to prevent onBlur from hiding suggestions
              >
                {city.name}, {city.region}, {city.country}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Input;
