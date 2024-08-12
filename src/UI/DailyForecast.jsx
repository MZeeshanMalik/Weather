/* eslint-disable react/prop-types */
function DailyForecast({ data, day }) {
  function dateConverter(date) {
    const dateObj = new Date(date);
    let hours = dateObj.getHours();
    // let mins = dateObj.getMinutes()
    const ampm = hours >= 12 ? "pm" : "Am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours} ${ampm}`;
  }
  return (
    <div className="flex flex-col items-center mt-2">
      <div>{dateConverter(data.time)}</div>
      <div className="text-xl">
        <img className="h-12" src={`https:${data.condition.icon}`} alt="img" />
      </div>
      <div className="text-sm">{day.avgtemp_c}</div>
      {/* </>;
      })} */}
    </div>
  );
}

export default DailyForecast;
