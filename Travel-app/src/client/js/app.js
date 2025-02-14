import { updateUI } from './updateUI.js';

const handleSubmit = async (event) => {
  event.preventDefault();
  const location = document.getElementById('location').value;
  const date = document.getElementById('date').value;

  if (!location || !date) {
    alert('Please enter both location and date.');
    return;
  }

  try {
    const geoData = await fetchGeoData(location);
    const imageURL = await fetchImage(location);
    const weatherData = await fetchWeatherData(geoData.lat, geoData.lng, date);

    updateUI({ location, date, weatherData, imageURL });
  } catch (error) {
    console.error('❌ Error fetching data:', error);
    alert(error);
  }
};

async function fetchGeoData(location) {
  try {
    const response = await fetch('http://localhost:8001/geonames', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch geolocation: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("📡 Parsed GeoNames data:", data);

    if (!data || !data.lat || !data.lng) {
      throw new Error("GeoNames response is empty or invalid");
    }

    const { lat, lng } = data; 
    return { lat, lng };
  } catch (error) {
    console.error("❌ Error in fetchGeoData:", error);
    return null;
  }
}

async function fetchWeatherData(lat, lng) {
  try {
    const response = await fetch('http://localhost:8001/weatherbit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching data:', errorData);
      throw new Error('Error fetching weather data');
    }

    const weatherData = await response.json();
    console.log('Weather Data:', weatherData);
    return weatherData;
  } catch (error) {
    console.error('❌ Error in fetchWeatherData:', error);
  }
}



async function fetchImage(location) {
  try {
    const response = await fetch('http://localhost:8001/pixabay', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("🖼️ Image data:", data);

    return data.imageUrl || "https://via.placeholder.com/300";
  } catch (error) {
    console.error("❌ Error fetching image:", error);
    return "https://via.placeholder.com/300";
  }
}
export { handleSubmit };  
