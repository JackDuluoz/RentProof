const properties = [
 {
    "id": 10,
    "province": "BC",
    "city": "Vancouver",
    "street_address": "1550 Duchess Ave, West Vancouver",
    "latitude": "49.329546400",
    "longitude": "-123.157720200"
  },
  {
    "id": 9,
    "province": "BC",
    "city": "Vancouver",
    "street_address": "195 21st St, West Vancouver",
    "latitude": "49.328457000",
    "longitude": "-123.168500000"
  },
  {
    "id": 8,
    "province": "BC",
    "city": "Vancouver",
    "street_address": "1425 Esquimalt Ave, West Vancouver",
    "latitude": "49.330754300",
    "longitude": "-123.155069700"
  },
  {
    "id": 7,
    "province": "BC",
    "city": "Vancouver",
    "street_address": "2025 Bellevue Ave, West Vancouver",
    "latitude": "49.328688700",
    "longitude": "-123.166817800"
  },
  {
    "id": 6,
    "province": "BC",
    "city": "Vancouver",
    "street_address": "2085 Bellevue Ave, West Vancouver",
    "latitude": "49.328949900",
    "longitude": "-123.167649300"
  },
  {
    "id": 5,
    "province": "BC",
    "city": "Vancouver",
    "street_address": "935 Marine Dr, West Vancouver",
    "latitude": "49.327696900",
    "longitude": "-123.141761300"
  },
  {
    "id": 4,
    "province": "BC",
    "city": "Vancouver",
    "street_address": "2190 Bellevue Ave, West Vancouver",
    "latitude": "49.329242800",
    "longitude": "-123.170258900"
  },
  {
    "id": 3,
    "province": "BC",
    "city": "Vancouver",
    "street_address": "2100 Bellevue Ave, West Vancouver",
    "latitude": "49.328616100",
    "longitude": "-123.168406900"
  },
  {
    "id": 2,
    "province": "BC",
    "city": "Vancouver",
    "street_address": "1370 Clyde Ave, West Vancouver",
    "latitude": "49.328472500",
    "longitude": "-123.153542600"
  },
  {
    "id": 1,
    "province": "BC",
    "city": "Vancouver",
    "street_address": "1775 Bellevue Ave, West Vancouver",
    "latitude": "49.327847100",
    "longitude": "-123.161684000"
  }
]

const getPropertyById = (id) => {
  return properties
    .filter(property => property.id === id)
}

const prices = [
  {
    "id": 1,
    "property_id": 1,
    "user_id": 1,
    "admin_status": "approved",
    "date": "2014-02-02T08:00:00.000Z",
    "price": "2130",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://www.bh-architects.com/wp-content/uploads/2018/07/The-Wiiliam-contemporary-apartment-interior-design-galley-kitchen.jpg",
    "property_type": "apartment",
    "square_footage": 1166,
    "number_of_bedrooms": 3,
    "number_of_bathrooms": 1
  },
  {
    "id": 2,
    "property_id": 1,
    "user_id": 1,
    "admin_status": "approved",
    "date": "2015-02-02T08:00:00.000Z",
    "price": "2410",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://www.bh-architects.com/wp-content/uploads/2018/07/The-Wiiliam-contemporary-apartment-interior-design-galley-kitchen.jpg",
    "property_type": "apartment",
    "square_footage": 1166,
    "number_of_bedrooms": 3,
    "number_of_bathrooms": 1
  },
  {
    "id": 3,
    "property_id": 1,
    "user_id": 1,
    "admin_status": "rejected",
    "date": "2016-02-02T08:00:00.000Z",
    "price": "2690",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://www.bh-architects.com/wp-content/uploads/2018/07/The-Wiiliam-contemporary-apartment-interior-design-galley-kitchen.jpg",
    "property_type": "apartment",
    "square_footage": 1166,
    "number_of_bedrooms": 3,
    "number_of_bathrooms": 1
  },
  {
    "id": 4,
    "property_id": 1,
    "user_id": 1,
    "admin_status": "pending",
    "date": "2017-02-02T08:00:00.000Z",
    "price": "2740",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://www.bh-architects.com/wp-content/uploads/2018/07/The-Wiiliam-contemporary-apartment-interior-design-galley-kitchen.jpg",
    "property_type": "apartment",
    "square_footage": 1166,
    "number_of_bedrooms": 3,
    "number_of_bathrooms": 1
  },
  {
    "id": 5,
    "property_id": 2,
    "user_id": 1,
    "admin_status": "rejected",
    "date": "2018-02-02T08:00:00.000Z",
    "price": "3130",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://www.bh-architects.com/wp-content/uploads/2018/07/The-Wiiliam-contemporary-apartment-interior-design-galley-kitchen.jpg",
    "property_type": "apartment",
    "square_footage": 1166,
    "number_of_bedrooms": 3,
    "number_of_bathrooms": 1
  },
  {
    "id": 6,
    "property_id": 2,
    "user_id": 1,
    "admin_status": "pending",
    "date": "2019-02-02T08:00:00.000Z",
    "price": "3170",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://www.bh-architects.com/wp-content/uploads/2018/07/The-Wiiliam-contemporary-apartment-interior-design-galley-kitchen.jpg",
    "property_type": "apartment",
    "square_footage": 1166,
    "number_of_bedrooms": 3,
    "number_of_bathrooms": 1
  },
  {
    "id": 7,
    "property_id": 4,
    "user_id": 1,
    "admin_status": "approved",
    "date": "2020-02-02T08:00:00.000Z",
    "price": "3240",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://www.bh-architects.com/wp-content/uploads/2018/07/The-Wiiliam-contemporary-apartment-interior-design-galley-kitchen.jpg",
    "property_type": "apartment",
    "square_footage": 1166,
    "number_of_bedrooms": 3,
    "number_of_bathrooms": 1
  },
  {
    "id": 8,
    "property_id": 4,
    "user_id": 1,
    "admin_status": "rejected",
    "date": "2021-02-02T08:00:00.000Z",
    "price": "3550",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://www.bh-architects.com/wp-content/uploads/2018/07/The-Wiiliam-contemporary-apartment-interior-design-galley-kitchen.jpg",
    "property_type": "apartment",
    "square_footage": 1166,
    "number_of_bedrooms": 3,
    "number_of_bathrooms": 1
  },
  {
    "id": 9,
    "property_id": 4,
    "user_id": 1,
    "admin_status": "pending",
    "date": "2022-02-02T08:00:00.000Z",
    "price": "3740",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://www.bh-architects.com/wp-content/uploads/2018/07/The-Wiiliam-contemporary-apartment-interior-design-galley-kitchen.jpg",
    "property_type": "apartment",
    "square_footage": 1166,
    "number_of_bedrooms": 3,
    "number_of_bathrooms": 1
  },
  {
    "id": 11,
    "property_id": 5,
    "user_id": 1, 
    "admin_status": "approved",
    "date": "2014-02-02T08:00:00.000Z",
    "price": "1480",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://news2-images.vice.com/uploads/2017/04/Toronto1bed.jpg",
    "property_type": "apartment",
    "square_footage": 686,
    "number_of_bedrooms": 2,
    "number_of_bathrooms": 1
  },
  {
    "id": 12,
    "property_id": 6,
    "user_id": 1,
    "admin_status": "rejected",
    "date": "2015-02-02T08:00:00.000Z",
    "price": "1690",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://news2-images.vice.com/uploads/2017/04/Toronto1bed.jpg",
    "property_type": "apartment",
    "square_footage": 686,
    "number_of_bedrooms": 2,
    "number_of_bathrooms": 1
  },
  {
    "id": 13,
    "property_id": 7,
    "user_id": 1,
    "admin_status": "pending",
    "date": "2016-02-02T08:00:00.000Z",
    "price": "1700",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://news2-images.vice.com/uploads/2017/04/Toronto1bed.jpg",
    "property_type": "apartment",
    "square_footage": 686,
    "number_of_bedrooms": 2,
    "number_of_bathrooms": 1
  },
  {
    "id": 14,
    "property_id": 9,
    "user_id": 1,
    "admin_status": "pending",
    "date": "2017-02-02T08:00:00.000Z",
    "price": "1880",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://news2-images.vice.com/uploads/2017/04/Toronto1bed.jpg",
    "property_type": "apartment",
    "square_footage": 686,
    "number_of_bedrooms": 2,
    "number_of_bathrooms": 1
  },
  {
    "id": 15,
    "property_id": 9,
    "user_id": 1,
    "admin_status": "rejected",
    "date": "2018-02-02T08:00:00.000Z",
    "price": "1940",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://news2-images.vice.com/uploads/2017/04/Toronto1bed.jpg",
    "property_type": "apartment",
    "square_footage": 686,
    "number_of_bedrooms": 2,
    "number_of_bathrooms": 1
  },
  {
    "id": 16,
    "property_id": 9,
    "user_id": 1,
    "admin_status": "approved",
    "date": "2019-02-02T08:00:00.000Z",
    "price": "2030",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://news2-images.vice.com/uploads/2017/04/Toronto1bed.jpg",
    "property_type": "apartment",
    "square_footage": 686,
    "number_of_bedrooms": 2,
    "number_of_bathrooms": 1
  },
  {
    "id": 17,
    "property_id": 10,
    "user_id": 1,
    "admin_status": "rejected",
    "date": "2020-02-02T08:00:00.000Z",
    "price": "2250",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://news2-images.vice.com/uploads/2017/04/Toronto1bed.jpg",
    "property_type": "apartment",
    "square_footage": 686,
    "number_of_bedrooms": 2,
    "number_of_bathrooms": 1
  },
  {
    "id": 18,
    "property_id": 10,
    "user_id": 1,
    "admin_status": "pending",
    "date": "2021-02-02T08:00:00.000Z",
    "price": "2540",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://news2-images.vice.com/uploads/2017/04/Toronto1bed.jpg",
    "property_type": "apartment",
    "square_footage": 686,
    "number_of_bedrooms": 2,
    "number_of_bathrooms": 1
  },
  {
    "id": 19,
    "property_id": 10,
    "user_id": 1,
    "admin_status": "pending",
    "date": "2022-02-02T08:00:00.000Z",
    "price": "2620",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://news2-images.vice.com/uploads/2017/04/Toronto1bed.jpg",
    "property_type": "apartment",
    "square_footage": 686,
    "number_of_bedrooms": 2,
    "number_of_bathrooms": 1
  },
  {
    "id": 20,
    "property_id": 10,
    "user_id": 1,
    "admin_status": "rejected",
    "date": "2014-02-02T08:00:00.000Z",
    "price": "1040",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://www.interiorzine.com/wp-content/uploads/2017/11/50-small-studio-apartment-design-ideas-modern-tiny-clever.jpg",
    "property_type": "apartment",
    "square_footage": 507,
    "number_of_bedrooms": 0,
    "number_of_bathrooms": 1
  },
  {
    "id": 21,
    "property_id": 10,
    "user_id": 1,
    "admin_status": "approved",
    "date": "2014-02-02T08:00:00.000Z",
    "price": "1040",
    "documentation": "https://www2.gov.bc.ca/assets/gov/housing-and-tenancy/residential-tenancies/forms/rtb1_chrome.pdf",
    "photo": "https://www.interiorzine.com/wp-content/uploads/2017/11/50-small-studio-apartment-design-ideas-modern-tiny-clever.jpg",
    "property_type": "apartment",
    "square_footage": 507,
    "number_of_bedrooms": 0,
    "number_of_bathrooms": 1
  }
]

// const propertiesWithAtLeastOneApprovedPrice = (properties, prices) => {
//   return properties
//     .filter(property => {
//       return prices.some(price => ((price.property_id === property.id) && price.admin_status === "approved"));
//     })
//     .reverse()
//     .map(property => {
//       return property;
//     });
// }

// const testProperty = {
//     "id": 10,
//     "province": "BC",
//     "city": "Vancouver",
//     "street_address": "1550 Duchess Ave, West Vancouver",
//     "latitude": "49.329546400",
//     "longitude": "-123.157720200"
//   }

// const deletePricesForProperty = (property) => {
//   return prices
//     .filter(price => {
//       return price.property_id !== property.id
//     })
//     // .reverse()
//     .map(price => {
//       return price
//     })
// }

// const getPricesForProperty = (propertyId, prices) => {
//       let propertyPriceArray = []
//         for (let price of prices) {
//           if (price.property_id === propertyId) {
//             propertyPriceArray.push(price)
//           }
//         }
//       return propertyPriceArray
// }
