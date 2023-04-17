## RentProof

RentProof tracks and analyses rental prices. Users can submit info about their rent costs, and the app tracks this data, graphing out rental increases over the years, and showing how each property's price fluctuations compare to the rest of the market.

## Examples

### Main Page

![averages-filters](https://user-images.githubusercontent.com/114964214/219803273-82b17612-df77-457b-8ff4-84e6411a84ce.gif)

### Color-Coded Pins

![pin-color](https://user-images.githubusercontent.com/114964214/219803406-846513ee-60bf-4f69-ae85-7c1c1b0a4be1.gif)


### Property View

![selected-property](https://user-images.githubusercontent.com/114964214/219803343-a6fc91a7-ff3f-456e-959f-dcf60b886304.gif)


///////////////////////////////////////////////////////////////////////////////////////////////////////

## Getting Started

To get started with RentProof, you'll need to install both the client and server dependencies. Here's how:

Clone the RentProof repository from GitHub:
git clone https://github.com//jamesraymondbrown/rent-tracker

Install the server dependencies:
cd rent-proof/server
npm install

Install the client dependencies:
cd ../client
npm install

Start the server:
cd ../server
npm run start

Start the client:
cd ../client
npm run start

////////////////////////////////////////////////////////////////////////////////////////////////////////

## Server Scripts

start: Starts the server
reset: Resets the database to its initial state (run this only in development mode)
run dev: Starts the server in development mode using nodemon

## Dependencies

Server:

- @googlemaps/markerclusterer@2.0.15
- body-parser@1.18.3
- cors@2.8.5
- dotenv@7.0.0
- eslint@8.7.0
- express@4.16.4
- express-fileupload@1.4.0
- helmet@3.18.0
- morgan@1.10.0
- nodemon@2.0.20
- pg@8.8.0
- prettier@2.5.1
- react-dual-range-slider@1.0.4
- react-js-multi-range-sliders@0.1.6
- react-lazyload@3.2.0
- react-loader-spinner@5.3.4

Client:

- @fortawesome/fontawesome-svg-core@6.3.0
- @fortawesome/free-solid-svg-icons@6.3.0
- @fortawesome/react-fontawesome@0.2.0
- @google/markerclustererplus@5.1.3
- @googlemaps/markerclusterer@2.0.15
- @react-google-maps/api@2.7.0
- @testing-library/jest-dom@5.16.5
- @testing-library/react@12.1.5
- @testing-library/user-event@13.5.0
- axios@1.1.3
- dotenv@7.0.0
- eslint@8.7.0
- fetch@1.1.0
- node-fetch@3.3.0
- prettier@2.5.1
- primeicons@6.0.1
- primereact@9.0.0-beta.1
- react@17.0.2
- react-client-session@0.0.8
- react-dom@17.0.2
- react-router-dom@5.2.0
- react-scripts@5.0.1
- recharts@2.4.0
- web-vitals@2.1.4
- sass@1.58.0

## Scripts

- start: Starts the client
- build: Builds the client for production
- test: Runs the client's test suite
- eject: Ejects the client from react-scripts

## Proxy

The client is configured to proxy API requests to the server at http://localhost:8001.
