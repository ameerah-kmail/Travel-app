# Travel Planner App
## Overview

The Travel Planner App helps users plan trips by providing weather forecasts and destination images. It integrates data from three external APIs:
+ Geonames API: Retrieves geographical coordinates for the destination.
+ Weatherbit API: Provides weather forecasts based on location coordinates.
+ Pixabay API: Displays images related to the destination.
The app dynamically updates the UI and is built using modern web technologies, including Webpack, Express.js, and Service Workers.

## Technologies Used
+ Frontend: JavaScript (ES6+), SCSS, HTML
+ Backend: Node.js, Express.js
+ APIs: Geonames, Weatherbit, Pixabay
+ Build Tools: Webpack
+ Testing: Jest

## Prerequisites
- Node.js v18.18.0
- npm (Node Package Manager)

## Installation
 - Clone the repository
 - Install dependencies:
    --- npm install
## Usage

- Start the development server:
 -- npm run start
- Build the project for production:
 -- npm run build
- Run tests:
 -- npm run test
  
## Features
+ Users can enter a travel destination and date.
+ The app fetches and displays weather forecasts for the travel period.
+ Relevant destination images are retrieved and shown.
+ A countdown timer displays the days remaining until the trip.
+ Offline support using Service Workers.

## License
 This project is licensed under the MIT License.

## Contact
 For any issues or inquiries, feel free to contact Ameerah Kmail at ameerahhasan90@gmail.com.
