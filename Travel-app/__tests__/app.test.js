import { handleSubmit } from '../src/client/js/app';

// Mock dependencies
jest.mock('../src/client/js/updateUI', () => ({
  updateUI: jest.fn(),
}));

jest.mock('../src/client/js/app', () => ({
  handleSubmit: jest.requireActual('../src/client/js/app').handleSubmit,
  fetchGeoData: jest.fn(() => Promise.resolve({ lat: 48.8566, lng: 2.3522 })), // Mocked response for Paris
  fetchWeatherData: jest.fn(() => Promise.resolve({ temp: 20, description: "Sunny" })),
  fetchImage: jest.fn(() => Promise.resolve("https://example.com/paris.jpg")),
}));

describe("handleSubmit function", () => {
  let event;

  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <input id="location" value="Paris" />
        <input id="date" value="2025-05-01" />
        <button type="submit">Submit</button>
      </form>
    `;

    event = { preventDefault: jest.fn() };
    window.alert = jest.fn(); // Mock alert
  });

  test("should be defined", () => {
    expect(handleSubmit).toBeDefined();
  });

  test("should prevent default form submission", async () => {
    await handleSubmit(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  test("should alert if location or date is missing", async () => {
    document.getElementById("location").value = "";
    await handleSubmit(event);
    expect(window.alert).toHaveBeenCalledWith("Please enter both location and date.");
  });
});
