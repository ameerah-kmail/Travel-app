import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser';

// Load environment variables from .env file
dotenv.config();
const app = express();
app.use(express.static("dist"));
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

const PORT = 8001;

// GeoNames API configuration
const GEO_API_URL = 'http://api.geonames.org/searchJSON';
const GEO_USERNAME = 'ameera';

// GeoNames endpoint to get latitude and longitude for a given location
app.post("/geonames", async (req, res) => {
  const { location } = req.body;

  if (!location) {
    return res.status(400).send({ error: "Location is required" });
  }

  try {
    const response = await fetch(`${GEO_API_URL}?q=${location}&maxRows=1&username=${GEO_USERNAME}`);
    const data = await response.json();  

    console.log("🌍 GeoNames API Response:", JSON.stringify(data, null, 2)); // ✅ Check response format

    if (data.geonames && data.geonames.length > 0) {
      const { lat, lng } = data.geonames[0];
      res.send({ lat, lng });
    } else {
      console.error("❌ Location not found in GeoNames response.");
      res.status(404).send({ error: "Location not found", rawData: data });
    }
  } catch (error) {
    console.error("❌ Error fetching data from GeoNames:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Weatherbit API configuration
const WEATHER_API_URL = 'https://api.weatherbit.io/v2.0/current';
const WEATHER_API_KEY = '052c573e7ca14c9d83c16eb75f95b9ed';

// Weatherbit endpoint to get weather data based on latitude and longitude
app.post("/weatherbit", async (req, res) => {
  const { lat, lng } = req.body; 

  if (!lat || !lng) {
    return res.status(400).send({ error: 'Latitude and Longitude are required' });
  }

  try {
    const response = await fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lng}&key=${WEATHER_API_KEY}`);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const weather = data.data[0];
      res.send({
        temperature: weather.temp,
        weather_description: weather.weather.description,
        city_name: weather.city_name,
      });
    } else {
      res.status(404).send({ error: 'Weather data not found' });
    }
  } catch (error) {
    console.error('Error fetching data from Weatherbit:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Pixabay API configuration
const PIXABAY_API_URL = 'https://pixabay.com/api/';
const PIXABAY_API_KEY = '48833698-dc902069d630a00879dadedc3'; 

// Pixabay endpoint to get images for a given location
app.post("/pixabay", async (req, res) => {
  console.log('Request body:', req.body);
  const { location } = req.body; 

  if (!location) {
    return res.status(400).send({ error: 'Location is required' });
  }

  try {
    const response = await fetch(`${PIXABAY_API_URL}?key=${PIXABAY_API_KEY}&q=${location}&image_type=photo`);

    if (!response.ok) {
      return res.status(500).send({ error: 'Failed to fetch image from Pixabay' });
    }

    const data = await response.json();

    if (data.hits && data.hits.length > 0) {
      const imageUrl = data.hits[0].webformatURL; 
      console.log('Image URL:', imageUrl);
      res.send({ imageUrl });
    } else {
      res.status(404).send({ error: 'Image not found for the given location' });
    }
  } catch (error) {
    console.error('Error fetching image from Pixabay:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Default route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
