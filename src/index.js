import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchContent } from './fetchContent';
// const axios = require('axios');

// const BASE_URL = 'https://pixabay.com/api/';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  // searchQuery: document.querySelector('[name="searchQuery"]'),
};

refs.searchForm.addEventListener('submit', onSearchForm);

function onSearchForm(evt) {
  evt.preventDefault();
  // if (evt.target.value.trim() === '') {
  //   return clearAll();
  // }
  // fetchContent(evt.target.value.trim().toLowerCase());
  console.log(evt.currentTarget.elements.searchQuery.value.toLowerCase());
  fetchContent(evt.currentTarget.elements.searchQuery.value.toLowerCase());
}

async function fetchContent(name) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=31160684-b0388cec495519ac32683cd6a&q=${name}&image_type=photo`
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
