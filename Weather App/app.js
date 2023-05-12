
const $ = document.querySelector.bind(document);

const wrapper = $('.wrapper')
const cityName = $('.city-section .city-name');
const temperature = $('.city-section .temperature');
const windSpeed = $('.wind-speed p');
const humidity = $('.humidity p');
const mainWeather = $('.main-weather p');

const weatherImage = $('.section-image img')
const mainWeatherImage = $('.main-weather img');

const searchInput = $('.search-section input');
const btnSearch = $('.btn-search')

const btnChooseTheme = $('.choose-theme input');

const appMain = $('.app')

const app = {
    checkWeather: function(city = 'new york') {  
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&&appid=c6122c14e748e16ba294967665eb2402`;

        fetch(apiUrl)
        .then((response) => {
                return response.json();
        })
        .then((data) => {
            console.log(data);
            cityName.textContent = data.name;
            temperature.textContent = `${Math.round(data.main.temp)} °C`;
            windSpeed.textContent = `${data.wind.speed} km/h`;
            humidity.textContent = `${data.main.humidity}%`;
            switch (data.weather[0].main) {
                case 'Clounds':
                    weatherImage.src = './img/clouds.png';
                    mainWeather.textContent = `${data.weather[0].main}`;
                    mainWeatherImage.src = './img/clouds.png';
                    break;
                case 'Clear':
                    weatherImage.src = './img/sun.png';
                    mainWeatherImage.src = './img/sun.png';
                    mainWeather.textContent = `${data.weather[0].main}`;
                    break;
                case 'Rain':
                    weatherImage.src = './img/rain.png';
                    mainWeatherImage.src = './img/rain.png';
                    mainWeather.textContent = `${data.weather[0].main}`;
                    break;
                case 'Drizzle':
                    weatherImage.src = './img/drizzle.png';
                    mainWeatherImage.src = './img/drizzle.png';
                    mainWeather.textContent = `${data.weather[0].main}`;
                    break;
                case 'Mist':
                    weatherImage.src = './img/fog.png';
                    mainWeatherImage.src = './img/fog.png';
                    mainWeather.textContent = `${data.weather[0].main}`;
                    break;
                default:
                    break;
            }
           
        })
        .catch((err) => {
            cityName.textContent = `${searchInput.value} is not a city !`;
            temperature.textContent = `0 °C`;
            windSpeed.textContent = `0 km/h`;
            humidity.textContent = `0%`;
            alert('Please enter city name exist!')
        })
    },
    handlerEvents: function() {
        searchInput.onkeypress = (e) => {
            if(e.keyCode === 13) {
                this.checkWeather(searchInput.value.trim().toLowerCase());
            }     
        };
        btnSearch.onclick = (e) => {
            this.checkWeather(searchInput.value.trim().toLowerCase());
        }

        // Choose theme
        btnChooseTheme.onclick = (e) => {
            wrapper.classList.toggle('light-theme');
            if(wrapper.classList.contains('light-theme')) {
                $('.choose-theme span').textContent = 'Dark mode'
            } else {
                $('.choose-theme span').textContent = 'Light mode'
            }
        }
    },
    start: function() {
        this.checkWeather();
        this.handlerEvents();
    }
}
app.start();