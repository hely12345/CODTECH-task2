const key = "2e3ca08bbccba54436bbb44c99167563";
const url = "https://api.openweathermap.org/data/2.5/forecast?&units=metric&q=";
const searchBox = document.querySelector(".search input[type='text']");
const searchButton = document.querySelector(".search button");
const icon = document.querySelector(".imgg");

async function check(city) {
    const rep = await fetch(`${url}${city}&appid=${key}`);
    const data = await rep.json();

    document.querySelector(".city").innerHTML = data.city.name;
    document.querySelector(".temp").innerHTML = Math.round(data.list[0].main.temp) + "°C";
    document.querySelector(".humid").innerHTML = data.list[0].main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.list[0].wind.speed + "km/hr";

    console.log(data);
    if (data.list[0].weather[0].main == "Clouds") {
        icon.src = "images/clouds.png";
    } else if (data.list[0].weather[0].main == "Clear") {
        icon.src = "images/clear.png";
    } else if (data.list[0].weather[0].main == "Drizzle") {
        icon.src = "images/drizzle.png";
    } else if (data.list[0].weather[0].main == "Mist") {
        icon.src = "images/mist.png";
    } else if (data.list[0].weather[0].main == "Rain") {
        icon.src = "images/rain.png";
    }

    const forecast = document.querySelector(".forecast");
    forecast.innerHTML = '';

    for (let i = 0; i < data.list.length; i += 8) {
        const dayData = data.list[i];
        const date = new Date(dayData.dt * 1000); // Convert UNIX timestamp to JS Date object

        forecast.innerHTML += `
            <div class="day">
                <h3>${date.toDateString()}</h3>
                <p>Temp: ${Math.round(dayData.main.temp)}°C</p>
                <p>Humidity: ${dayData.main.humidity}%</p>
                <p>Wind: ${dayData.wind.speed}km/hr</p>
                <p>Description: ${dayData.weather[0].description}</p>
            </div>
        `;
    }
}

searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        check(searchBox.value);
    }
});

searchButton.addEventListener("click", () => {
    check(searchBox.value);
});

check("Delhi"); // Default city
