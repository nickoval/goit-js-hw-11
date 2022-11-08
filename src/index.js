import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchContent } from './fetchContent';
// const axios = require('axios');

// const BASE_URL = 'https://pixabay.com/api/';

const lightBox = new SimpleLightbox('.gallery-item', {
  captionsData: 'alt',
  captionDelay: 250,
});

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

  fetchContent(evt.currentTarget.elements.searchQuery.value.toLowerCase())
    .then(respData => {
      console.log(respData);
      console.log(respData.data.hits);
      // dataAnalysis(countryData);
      parseData(respData);
      // console.log('OK');
    })
    .catch(error => {
      // console.log('onInput ~ error', error);
      Notify.failure('Oops, there is no images with that name');
    });
}

function parseData(respData) {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    respData.data.hits.map(markupPicturiesList).join('')
  );
  lightBox.refresh();
}

// console.log( markupPicturiesList);

function markupPicturiesList({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
        <a class="gallery-item" href="${largeImageURL}">
<img src="${webformatURL}" alt="${tags}" loading="lazy" />
</a>
  <div class="info">
    <p class="info-item">
      <b>Likes: </b> ${likes}
    </p>
    <p class="info-item">
      <b>Views: </b> ${views}
    </p>
    <p class="info-item"> 
      <b>Comments: </b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads: </b> ${downloads}
    </p>
  </div>
</div>`;
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
