export function updateUI({ location, date, weatherData, imageURL }) {
  document.getElementById("trip-location").textContent = location;
  document.getElementById("trip-date").textContent = `Departing on: ${date}`;
  document.getElementById("weather").textContent = `Weather: ${weatherData.temperature}°C`;
  document.getElementById("trip-image").src = imageURL;
}