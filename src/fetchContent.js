import { PER_PAGE } from './index';
const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
// const PER_PAGE = 40;

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

export async function fetchContent(name, page) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=31160684-b0388cec495519ac32683cd6a&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`
    );
    console.log('response: ', response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
