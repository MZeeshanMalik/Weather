/* eslint-disable react/prop-types */
function Forecast({ max_temprature, min_temp, date, icon = null }) {
  return (
    <>
      <div className="space-y-3">
        <div className="flex justify-between items-center mt-5">
          <div>{date}</div>
          <div className="flex items-center">
            <div className="text-2xl">{icon}</div>
            <div className="ml-4">
              {max_temprature} / {min_temp}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forecast;
