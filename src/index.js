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
  // if (evt.currentTarget.elements.searchQuery.value.trim() === '') {
  //   return clearAll();
  // }

  // fetchContent(evt.target.value.trim().toLowerCase());
  // console.log(evt.currentTarget.elements.searchQuery.value.toLowerCase());
  // const aaa= fetchContent(evt.currentTarget.elements.searchQuery.value.toLowerCase());
  // console.log(aaa);

 fetchContent(evt.currentTarget.elements.searchQuery.value.toLowerCase()).then(data => {
  // console.log(data);
  // dataAnalysis(countryData);
  parseData(data);
  // console.log('OK');
})
.catch(error => {
  // console.log('onInput ~ error', error);
  Notify.failure('Oops, there is no images with that name');
});;

}

function parseData (images) {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    images.map(markupPicturiesList).join('')
  );
}

// console.log( markupPicturiesList);

function markupPicturiesList() {
return `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`  ;
}


// async function fetchContent(name) {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}?key=31160684-b0388cec495519ac32683cd6a&q=${name}&image_type=photo`
//     );
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }


// function clearAll() {
//   refs.countryList.innerHTML = '';
//   refs.countryInfo.innerHTML = '';
// }