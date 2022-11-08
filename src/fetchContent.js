// import axios from 'axios';
// const axios = require('axios');
const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';

// export function fetchContent(name) {
//   fetch(
//     `${BASE_URL}?key=31160684-b0388cec495519ac32683cd6a&q=${name}&image_type=photo`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.atatus);
//     }
//     return response.json;
//   });
// }

export async function fetchContent(name) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=31160684-b0388cec495519ac32683cd6a&q=${name}&image_type=photo`
    );
    return response;
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
}
