const input = document.querySelector("#input");
const header = document.getElementById("header");
const temperature = document.getElementById("temperature");
const info = document.getElementById("info");
const windSpeed = document.getElementById("windspeed");
const mainContainer = document.getElementById("main-container");

mainContainer.style.opacity = "0"
input.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    const city = input.value;
    if (!city) {
      window.alert("Wrong city !");
    }
    fetchData(city);
  }
});

const fetchData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6b8255725562ddc33e6898251e8dccc0&units=metric&lang=tr`
  );
  const data = await response.json();
  const fetchedData = {
    info: data.weather[0].main,
    temp: data.main.temp,
    windSpeed: data.wind.speed,
  };
  console.log(fetchedData);
  if (fetchedData) {
    mainContainer.style.opacity = "1";
    header.innerText = headerSetter(city);
    temperature.innerText = `${fetchedData.temp.toString()} °C`;
    info.innerText = fetchedData.info.toString();
    windSpeed.innerText = `${fetchedData.windSpeed.toString()} km/h`;
  }
};
const headerSetter = (string) => {
  const formattedString = string
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
  return formattedString;
};
