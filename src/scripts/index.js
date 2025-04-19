import '../styles.css';
import { WeatherFetcher } from './WeatherGatherer';
import { WeatherRenderer } from './WeatherRenderer';

const cityInput = document.querySelector('.search-location');
const searchButton = document.getElementById('search-btn');

document.addEventListener('DOMContentLoaded', () => {
   const defaultCity = "Varna";
   WeatherFetcher.getWeatherData(defaultCity)
      .then(data => {
         if (data) {
            WeatherRenderer.renderWeatherData(data);
         } else {
            console.error("❌ No data received");
         }
      });
})

function handleSearch() {
   const city = cityInput.value.trim();
   if (city) {
      const weatherData = WeatherFetcher.getWeatherData(city);
      weatherData.then(data => {
         if (data) {
            WeatherRenderer.renderWeatherData(data);
         } else {
            console.error("❌ No data received");
         }
      });
   }
}

searchButton.addEventListener('click', handleSearch);

cityInput.addEventListener('keydown', (event) => {
   if (event.key === 'Enter') {
      handleSearch();
   }
});

function preloadImages(imagePaths) {
   const imagePromises = imagePaths.map(path => {
      return import(`../images/${path}`).then(imageModule => {
         const img = new Image();
         img.src = imageModule.default;
         return img;
      });
   });
}
 
const backgrounds = [
'cloudy.png',
'night.png',
'night-rain.png',
'partly-cloudy.png',
'rainy.png',
'thunderstorm.png',
];

const imagePaths = backgrounds.map(background => `${background}`);
preloadImages(imagePaths);

