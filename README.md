# RentProof

**RentProof is a rent accountability app that tracks user-supplied market data.**

The idea behind this project is that unbiased members of the public will contribute their rental price data to the app so that a detailed history of rental prices can be established for indivdual properties and regional markets. This empowers renters by providing them with a single repository for rental price data so they can quickly identify high-performing from low-performing properties over time.   

## Project Screenshots

### Home Page

![Home](./server/assets/home-page.gif)

### Colour Coded Markers

![Markers](./server/assets/markers.gif)

### Add Price

![Add](./server/assets/add.gif)

### Admin Approval

![Admin](./server/assets/approve.gif)

## Tech Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![PostgreSQL](https://img.shields.io/badge/postgresql-%2300f.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Google Maps API](https://img.shields.io/badge/google_maps_api-4285F4?style=for-the-badge&logo=google&logoColor=white)

## Installation

1. Clone this repository.
```$ git clone https://github.com/JackDuluoz/RentProof```

2. Run `npm install` from the root directory of the project.

3. Run `npm install` from inside the client directory.

```bash
$ cd RentProof
$ npm install
$ cd client
$ npm install
```

4. Set environment variables.

  Create a `.env` file in the client directory and insert your own placeholder values.

```bash
REACT_APP_GOOGLE_MAPS_API_KEY=<GOOGLE API KEY>
```

5. Start the back end from the root directory of the project.
`$ npm run dev`

6. Start the front ent from inside the client directory.
`$ npm start`

## Author

Michael Green [@michaelgreen](https://github.com/JackDuluoz)

## Acknowledgements

Built with [James Brown](https://github.com/jamesraymondbrown) and [Hadley Sutherland](https://github.com/Vuvvy1). We had a lot of fun putting this together!