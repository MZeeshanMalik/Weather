import { useEffect, useState } from "react";
import Forecast from "./Forecast";
import Loader from "./Loader";
import Body from "./Body";
import Input from "./Input";

const WeatherApiKey = `${import.meta.env.VITE_key}`;

function Home() {
  const [data, setData] = useState("");
  const [city, setCity] = useState("London");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to convert date string to day of the week
  function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  useEffect(
    function () {
      async function fetchWeather() {
        setLoading(true);
        setError("");
        const forecast = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${WeatherApiKey}&q=${city}&days=7&aqi=no&alerts=no`
        );
        if (forecast.status === 200) {
          const forecastResponse = await forecast.json();
          setData(forecastResponse);
          setLoading(false);
        } else {
          // console.log(forecast);
          setLoading(false);
          if (city === "") {
            setError(new Error("Please type any city"));
          } else {
            setError(new Error("City not found.Please retype the city"));
          }
        }
      }
      fetchWeather();
    },
    [city]
  );
  return (
    <>
      <div className="bg-stone-900 h-screen">
        <div className="grid grid-rows-[1fr_1fr] h-auto gap-3 p-4 bg-gray-900 text-stone-100 sm:grid-cols-[4fr_1fr]  sm:h-auto sm:grid-rows-none">
          {/* Main Content */}
          <div className="bg-gray-800 rounded-lg p-6 flex flex-col">
            <Input setCity={setCity} />
            {loading ? (
              <Loader />
            ) : (
              <>{error ? <div>{error.message}</div> : <Body data={data} />}</>
            )}
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl mb-4">7-Day Forecast</h2>

            {loading ? (
              <Loader />
            ) : (
              data?.forecast?.forecastday?.map((el, index) => (
                <Forecast
                  key={index}
                  date={getDayOfWeek(el.date)}
                  max_temprature={Math.ceil(el.day.maxtemp_c)}
                  min_temp={Math.ceil(el.day.mintemp_c)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
