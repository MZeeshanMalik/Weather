/* eslint-disable react/prop-types */

import DailyForecast from "./DailyForecast";

function Body({ data }) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold">{data?.location?.name}</h1>
          <p>
            Chance of rain:{" "}
            {data?.forecast?.forecastday?.at(0)?.day?.daily_chance_of_rain} %
          </p>
          <div className="text-6xl font-bold">{data?.current?.temp_c}</div>
        </div>
        <div className="text-8xl">
          <img
            className="h-20"
            src={`https:${data?.current?.condition?.icon}`}
            alt="img"
          />
          {/* ☀️ */}
        </div>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg mb-5">
        <h2 className="text-xl mb-4">Air Conditions</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Real Feel</p>
            <p className="text-3xl">{data?.current?.feelslike_c}</p>
          </div>
          <div>
            <p>Wind</p>
            <p className="text-3xl">{data?.current?.wind_kph} km/h</p>
          </div>
          <div>
            <p>Chance of rain</p>
            <p className="text-3xl">
              {data?.forecast?.forecastday?.at(0)?.day?.daily_chance_of_rain} %
            </p>
          </div>
          <div>
            <p>UV Index</p>
            <p className="text-3xl">{data?.current?.uv}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg mb-6">
        <h2 className="text-xl mb-4">Today's Forecast</h2>
        <div className="grid grid-cols-6 gap-4">
          {/* Time and Temp Blocks */}
          {data?.forecast?.forecastday[0]?.hour.map((el, index) => (
            <DailyForecast
              key={index}
              data={el}
              day={data.forecast.forecastday[0].day}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Body;
