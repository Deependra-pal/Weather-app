var input = document.querySelector("input");
var btn = document.querySelector(".seacrhBtn");

btn.addEventListener("click", () => {
  var city = input.value;

  if (city.trim() === "") return alert("please Enter a City");

  getData(city);
});

async function getData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=75d7efcb7b78218a52e2304533996930&units=metric`);
  const data = await response.json();
  console.log(data);
  
   
 
  document.querySelector(".container .city-name").innerHTML = data.name;
  document.querySelector(".container .temperature").innerHTML =  Math.round(data.main.temp)+"°C";
  document.querySelector(".container .condition").innerHTML = data.weather[0].main


  

  document.querySelector(".stats .humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".stats .wind").innerHTML = data.wind.speed + "km/h";
  document.querySelector(".stats .feet-like").innerHTML = data.main.feels_like;



}
