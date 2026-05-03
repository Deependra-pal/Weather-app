var input = document.querySelector("input");
var btn = document.querySelector(".seacrhBtn");

btn.addEventListener("click", () => {
  var city = input.value;

  if (city.trim() === "") return alert("please Enter a City");

  getData(city);
  forecast(city);
});

async function getData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=75d7efcb7b78218a52e2304533996930&units=metric`,
  );
  const data = await response.json();
  console.log(data);

  document.querySelector(".container .city-name").innerHTML = data.name;
  document.querySelector(".container .temperature").innerHTML =
    Math.round(data.main.temp) + "°C";
  document.querySelector(".container .condition").innerHTML =
    data.weather[0].main;

  document.querySelector(".stats .humidity").innerHTML =
    data.main.humidity + "%";
  document.querySelector(".stats .wind").innerHTML = data.wind.speed + "km/h";
  document.querySelector(".stats .feet-like").innerHTML = data.main.feels_like;
}

function forecast(City) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${City}&appid=75d7efcb7b78218a52e2304533996930&units=metric`,
  )
    .then((res) => res.json())
    .then((data) => {
      // Day wise group karo
      const dailyData = {};
      data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!dailyData[date]) {
          dailyData[date] = {
            date: date,
            temps: [],
          };
        }
        dailyData[date].temps.push(item.main.temp);
      });

      // Array banao
      const days = Object.values(dailyData);

      // HTML banao
      const forecastContainer =document.querySelector(".forecast") 
      forecastContainer.innerHTML = "";

      days.forEach((day) => {
        const max = Math.round(Math.max(...day.temps));
        const min = Math.round(Math.min(...day.temps));
        const dayName = new Date(day.date).toLocaleDateString("en-US", {
          weekday: "short",
        });

        forecastContainer.innerHTML += `
        <div class="forecast-day">
          <p>${dayName}</p>
          <h4>${max}°</h4>
          <span>${min}°</span>
        </div>
      `;
      });
    });
}
