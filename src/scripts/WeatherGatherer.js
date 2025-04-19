export class WeatherFetcher {
   static async getWeatherData(city = "Varna") {
      const token = "TQDKN24A97MJ2NQQXDGAXX5E9";

      try {         
         const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${token}`)
   
         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
         }
   
         const data = await response.json();
         return data;

      } catch (error) {
         alert("Invalid city name. Please try again.");
      }
   }
}