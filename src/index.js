import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchContent } from './fetchContent';

import { markupPicturiesList } from './markupContent';

const PER_PAGE = 40;


const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
  // searchQuery: document.querySelector('[name="searchQuery"]'),
};

const lightBox = new SimpleLightbox('.gallery-item', {
  captionsData: 'alt',
  captionDelay: 250,
});
// const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();

let currentPage = 1;
let searchImage = '';
let totalPages = 1;

refs.loadMore.style.visibility = 'hidden';

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearchForm(evt) {
  evt.preventDefault();
  clearAll();
  currentPage = 1;

  if (evt.currentTarget.elements.searchQuery.value.trim() === '') {
    return;
  }

  searchImage = evt.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();

  fetchContent(searchImage, currentPage)
    .then(respData => {
      console.log(respData);
      console.log(respData.data.hits);
      if (respData.data.totalHits === 0) {
        return Notify.failure('Oops, there is no images with that name');
      }
      totalPages = Math.ceil(respData.data.totalHits / PER_PAGE);
      console.log('onSearchForm ~ totalPages', totalPages);

      // dataAnalysis(countryData);
      parseData(respData);
      // console.log('OK');
      refs.loadMore.style.visibility = 'visible';
    })
    .catch(error => {
      // console.log('onInput ~ error', error);
      Notify.failure('Oops, there is no images with that name!!!');
    });
}

function parseData(respData) {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    respData.data.hits.map(markupPicturiesList).join('')
  );
  lightBox.refresh();
}

function onLoadMore() {
  currentPage += 1;

  if (currentPage >= totalPages) {
    currentPage = totalPages;
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    refs.loadMore.style.visibility = 'hidden';
  }

  // console.log('onLoadMore ~ currentPage', currentPage);
  fetchContent(searchImage, currentPage)
    .then(respData => {
      console.log(respData);
      console.log(respData.data.hits);
      // dataAnalysis(countryData);
      // if (respData.data.hits.length) {}
      // Notify.succes(
      //   `Hooray! We found ${respData.data.hits.length} more images.`
      // );
      parseData(respData);
      const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
      window.scrollBy({top: cardHeight * 2, behavior: "smooth",});
      // console.log('OK');
    })
    .catch(error => {
      // console.log('onInput ~ error', error);
      Notify.failure('Oops, there is no images with that name');
    });


}

function clearAll() {
  refs.gallery.innerHTML = '';
  refs.loadMore.style.visibility = 'hidden';
}

export { PER_PAGE };
