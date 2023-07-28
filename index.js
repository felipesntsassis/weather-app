const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

function clearWeatherDisplay() {
    weatherBox.classList.remove('fadeIn');
    weatherDetails.classList.remove('fadeIn');
    container.removeAttribute('style');
}

function fillWeatherData(data) {
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    console.log(data);
    switch(data.weather[0].main) {
        case 'Clear':
            image.src = 'images/clear.png';
            break;
        case 'Rain':
            image.src = 'images/rain.png';
            break;
        case 'Snow':
            image.src = 'images/snow.png';
            break;
        case 'Clouds':
            image.src = 'images/cloud.png';
            break;
        case 'Haze':
            image.src = 'images/haze.png';
            break;
        case 'Mist':
            image.src = 'images/mist.png';
            break;
        default:
            image.src = '';
    }

    temperature.innerHTML = `${parseInt(data.main.temp)} <span>ºC</span>`;
    description.innerHTML = `${data.weather[0].description}`;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind.innerHTML = `${parseInt(data.wind.speed)} Km/h`;
}

search.addEventListener('click', () => {

    const APIKey = 'b0b1f30d97345b95ba695eb3c7496adb';
    const city = document.querySelector('.search-box input').value;
    
    if (city === '') {
        if(weatherBox.style.display === '')
            clearWeatherDisplay();

        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?lang=pt_BR&q=${city}&units=metric&appid=${APIKey}`)
        .then((response) => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            fillWeatherData(json);

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

        });

});