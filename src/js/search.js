
import Notiflix from 'notiflix';
import { fetchImages, ITEMS_PER_PAGE } from './api.js';
import { renderImages, clearGallery } from './gallery.js';


// const searchForm = document.getElementById('search-form');
// const loadMoreBtn = document.querySelector('.load-more');

// let currentPage = 1;
// let currentQuery = '';

// searchForm.addEventListener('submit', handleSubmit);
// loadMoreBtn.addEventListener('click', loadMoreImages);

// async function handleSubmit(event) {
//   event.preventDefault();
//   currentPage = 1;
//   currentQuery = event.target.elements.searchQuery.value;
//   clearGallery();
//   await fetchAndRenderImages(currentQuery, currentPage);
// }
// async function loadMoreImages() {
//   currentPage += 1;
//   await fetchImages(currentQuery, currentPage);
// }


// async function fetchAndRenderImages(query, page) {
//   try {
//     const data = await fetchImages(query, page);
// if (query === '') {
//       Notiflix.Notify.failure('Please enter a search query.');
//       return [];
//     }

//     if (data.hits.length === 0) {
//       Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
//       return [];
//     }

//     renderImages(data.hits);

//     if (currentPage === 1) {
//       Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
//       loadMoreBtn.style.display = 'block';
//     }

//     if (data.totalHits <= currentPage * ITEMS_PER_PAGE) {
//       loadMoreBtn.style.display = 'none';
//       Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//     }

   
//   } catch (error) {
//     console.log(error);
//   }
// }
//  export { handleSubmit, loadMoreImages }
const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

let currentPage = 1;
let currentQuery = '';

async function handleSubmit(event) {
  event.preventDefault();
  currentPage = 1;
  currentQuery = event.target.elements.searchQuery.value;
  clearGallery();
  await fetchAndRenderImages(currentQuery, currentPage);
}

async function loadMoreImages() {
  currentPage += 1;
  await fetchAndRenderImages(currentQuery, currentPage);
}

async function fetchAndRenderImages(query, page) {
  try {
    const data = await fetchImages(query, page);

    if (query === '') {
      Notiflix.Notify.failure('Please enter a search query.');
      return;
    }

    if (data.hits.length === 0) {
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    renderImages(data.hits);

    if (currentPage === 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      loadMoreBtn.style.display = 'block';
    }

    if (data.totalHits <= currentPage * ITEMS_PER_PAGE) {
      loadMoreBtn.style.display = 'none';
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error);
  }
}

export { handleSubmit, loadMoreImages };