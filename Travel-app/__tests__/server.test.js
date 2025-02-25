import request from "supertest";
import app from "../src/server/server"; // Ensure this path is correct

const port = process.env.PORT || 8002;
let server;

beforeAll(() => {
  server = app.listen(port, () => console.log("Server started"));
});

afterAll(async () => {
  await server.close(); 
});

describe("Express Server API Endpoints", () => {
  
  // ✅ Test if the server is running
  test("Should return status 200 for the root endpoint", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
  });

  // ✅ Test GeoNames API
  describe("POST /geonames", () => {
    test("Should return latitude and longitude for a valid location", async () => {
      const response = await request(server).post("/geonames").send({ location: "Paris" });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("lat");
      expect(response.body).toHaveProperty("lng");
    });

    test("Should return 400 for missing location", async () => {
      const response = await request(server).post("/geonames").send({});
      expect(response.status).toBe(400);
    });

    test("Should return 404 for an invalid location", async () => {
      const response = await request(server).post("/geonames").send({ location: "NonExistentPlace123" });
      expect(response.status).toBe(404);
    });
  });

  // ✅ Test Weatherbit API
  app.post("/weatherbit", async (req, res) => {
    const { lat, lng } = req.body;
  
    if (!lat || !lng) {
      return res.status(400).send({ error: 'Latitude and Longitude are required' });
    }
  
    try {
      const response = await fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lng}&key=${WEATHER_API_KEY}`);
      const data = await response.json();
  
      // Return 404 if weather data is not found or invalid coordinates
      if (data.error || !data.data || data.data.length === 0) {
        console.error("❌ Weather data not found or invalid coordinates");
        return res.status(404).send({ error: 'Weather data not found' });
      }
  
      const weather = data.data[0];
      res.send({
        temperature: weather.temp,
        weather_description: weather.weather.description,
        city_name: weather.city_name,
      });
    } catch (error) {
      console.error('Error fetching data from Weatherbit:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });
  

  // ✅ Test Pixabay API
  describe("POST /pixabay", () => {
    test("Should return an image URL for a valid location", async () => {
      const response = await request(server).post("/pixabay").send({ location: "Paris" });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("imageUrl");
    });

    test("Should return 400 for missing location", async () => {
      const response = await request(server).post("/pixabay").send({});
      expect(response.status).toBe(400);
    });

    test("Should return 404 if no image is found", async () => {
      const response = await request(server).post("/pixabay").send({ location: "NonExistentPlace123" });
      expect(response.status).toBe(404);
    });
  });
});
