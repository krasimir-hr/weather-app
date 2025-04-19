import { WeatherFetcher } from './WeatherGatherer';

export class WeatherRenderer {
   static renderWeatherData(data) {
      const conditonIcons = {
         "clear-day": "clear_day",
         "clear-night": "bedtime",
         "cloudy": "cloud",
         "fog": "foggy",
         "hail": "weather_hail",
         "partly-cloudy-day": "partly_cloudy_day",
         "partly-cloudy-night": "partly_cloudy_night",
         "rain": "rainy",
         "rain-snow": "weather_mix",
         "rain-snow-showers-day": "weather_mix",
         "rain-snow-showers-night": "weather_mix",
         "showers-day": "rainy",
         "showers-night": "rainy",
         "sleet": "weather_hail",
         "snow": "weather_snowy",
         "snow-showers-day": "weather_snowy",
         "snow-showers-night": "weather_snowy",
         "thunder": "thunderstorm",
         "thunder-rain": "thunderstorm",
         "thunder-showers-day": "thunderstorm",
         "thunder-showers-night": "thunderstorm",
         "wind": "air",
      };

      const cityNameParagraph = document.querySelector('.city-name');
      cityNameParagraph.textContent = data.address;

      const currentTempParagraph = document.querySelector('.temperature');
      const currentTemp = data.currentConditions.temp;
      const currentTempInCelsius = Math.round((currentTemp - 32) * 5/9);
      currentTempParagraph.textContent = currentTempInCelsius + "°";

      const currentConditionsContainer = document.querySelector('.weather-summary');
      const currentConditionsIcon = data.currentConditions.icon;
      const iconName = conditonIcons[currentConditionsIcon];
      
      const currentConditions = data.currentConditions.conditions;

      currentConditionsContainer.querySelector('span').textContent = iconName
      currentConditionsContainer.querySelector('p').textContent = currentConditions
      
      const currentTime = data.currentConditions.datetime;
      const currentEpoch = data.currentConditions.datetimeEpoch;
      let epochSummer = currentEpoch;
      if (currentTime.split(":")[1] !== "00") {
         const minutesNum = Number(currentTime.split(":")[1]);
         epochSummer = currentEpoch - (minutesNum * 60);
      }
      
      

      const upcomingHoursContainers = document.querySelectorAll('.upcoming__time');

      const upcomingTempContainer = document.querySelectorAll('.upcoming__temp');
      let index = 0;
      const initialHour = data.currentConditions.datetime.split(":")[0];

      let hourNum = initialHour;
      let nextDay = false;

      if (hourNum === "23") {
         nextDay = true;
      }

      upcomingHoursContainers.forEach(container => {
         epochSummer += 3600;
         
         let hourData; 

         if (!nextDay) {
            hourData = data.days[0].hours.find(hour => hour.datetimeEpoch == epochSummer);
         } else {
            hourData = data.days[1].hours.find(hour => hour.datetimeEpoch == epochSummer);
         }
         
         console.log(epochSummer);
         
         const shortHour = hourData.datetime.split(":").slice(0, 2).join(":");
         container.textContent = shortHour;         

         const hourTempParagraph = upcomingTempContainer[index].querySelector('p');
         const hourTempIcon = upcomingTempContainer[index].querySelector('span');

         hourTempParagraph.textContent = Math.round((hourData.temp - 32) * 5/9) + "°";
         hourTempIcon.textContent = conditonIcons[hourData.icon];

         if (hourNum === "22") {
            nextDay = true;
         }

         hourNum = hourData.datetime.split(":")[0];
         
         index++;
      })

      const upcomingDaysContainers = document.querySelectorAll('.upcoming-week__day');
      
      index = 1;
      
      upcomingDaysContainers.forEach(container => {
         const dayData = data.days[index]
         const dateData = new Date(dayData.datetimeEpoch * 1000);
         const dayName = dateData.toLocaleDateString('en-US', {weekday: 'long'});
         const dayDate = dateData.toLocaleDateString('en-US', {month: 'long', day: 'numeric'});
         const dayTemp = Math.round((dayData.temp - 32) * 5/9);
         const dayIcon = conditonIcons[dayData.icon];

         const dayContainer = container.querySelector('.week-day');
         const dayDateContainer = container.querySelector('.month-day');
         const tempContainer = container.querySelector('.upcoming-week__day--temp');
         const iconContainer = container.querySelector('span');

         dayContainer.textContent = dayName;
         dayDateContainer.textContent = dayDate;
         tempContainer.textContent = dayTemp + "°";
         iconContainer.textContent = dayIcon;

         index++;
      })

      const currentWeather = data.currentConditions.icon;

      const backgrounds = {
         "clear-day": "clear_day",
         "clear-night": "night..png",
         "cloudy": "cloudy.png",
         "fog": "fog.jpg",
         "hail": "weather_hail",
         "partly-cloudy-day": "partly-cloudy.png",
         "partly-cloudy-night": "night.png",
         "rain": "rainy.png",
         "rain-snow": "weather_mix",
         "rain-snow-showers-day": "weather_mix",
         "rain-snow-showers-night": "weather_mix",
         "showers-day": "rainy.png",
         "showers-night": "rainy.png",
         "sleet": "weather_hail",
         "snow": "weather_snowy",
         "snow-showers-day": "weather_snowy",
         "snow-showers-night": "weather_snowy",
         "thunder": "thunderstorm.png",
         "thunder-rain": "thunderstorm.png",
         "thunder-showers-day": "thunderstorm.png",
         "thunder-showers-night": "night-rain.png",
         "wind": "cloudy.png",
      };

       

      function changeBackground(imagePath) {
         const body = document.body;

         body.style.setProperty('--new-background', body.style.getPropertyValue('--new-background'));
         body.classList.remove('bg-transition');
         
         const content = document.querySelector('.content-container');
         content.classList.remove('visible');
         
       
         setTimeout(() => {
           body.style.setProperty('--new-background', `url(${imagePath})`);
           body.classList.add('bg-transition');
           content.classList.add('visible');
         }, 300); 
      }

      const newImagePath = `images/${backgrounds[currentWeather]}`;
      changeBackground(newImagePath);
   }
}
