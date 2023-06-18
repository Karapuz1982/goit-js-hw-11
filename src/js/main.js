


// import axios from 'axios';
// import Notiflix from 'notiflix';
// import SimpleLightbox from 'simplelightbox';

// const API_KEY = '37136266-a42a32582919092089cbd6d65';
// const BASE_URL = 'https://pixabay.com/api/';
// const ITEMS_PER_PAGE = 40;

// const searchForm = document.getElementById('search-form');
// const galleryContainer = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

// let currentPage = 1;
// let currentQuery = '';

// const lightbox = new SimpleLightbox('.gallery a');

// searchForm.addEventListener('submit', handleSubmit);
// loadMoreBtn.addEventListener('click', loadMoreImages);

// async function handleSubmit(event) {
//   event.preventDefault();
//   currentPage = 1;
//   currentQuery = event.target.elements.searchQuery.value;
//   clearGallery();
//   await fetchImages(currentQuery, currentPage);
// }

// async function fetchImages(query, page) {
//   try {
//     const response = await axios.get(BASE_URL, {
//       params: {
//         key: API_KEY,
//         q: query,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         per_page: ITEMS_PER_PAGE,
//         page: page,
//       },
//     });
//     const { data } = response;
    
//     if (data.hits.length === 0) {
//       Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
//       return;
//     }
//     if (query === '') {
//       showErrorNotification('Please enter a search query.');
//       return;
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

    
//     lightbox.refresh();
//   } catch (error) {
//     console.log(error);
//   }
// }

// function renderImages(images) {
//   const galleryHTML = images
//     .map(
//       (image) => `
//       <div class="photo-card">
//         <a href="${image.largeImageURL}">
//           <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
//         </a>
//         <div class="info">
//           <p class="info-item"><b>Likes:</b> ${image.likes}</p>
//           <p class="info-item"><b>Views:</b> ${image.views}</p>
//           <p class="info-item"><b>Comments:</b> ${image.comments}</p>
//           <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
//         </div>
//       </div>
//     `
//     )
//     .join('');
//   galleryContainer.insertAdjacentHTML('beforeend', galleryHTML);
// }

// function clearGallery() {
//   galleryContainer.innerHTML = '';
// }

// async function loadMoreImages() {
//   currentPage+=1;
//   await fetchImages(currentQuery, currentPage);
// }

import { handleSubmit, loadMoreImages } from './search.js';
import { renderImages, clearGallery } from './gallery.js';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);
