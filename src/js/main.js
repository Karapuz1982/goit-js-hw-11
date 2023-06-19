

import { handleSubmit, loadMoreImages } from './search.js';
import { renderImages, clearGallery } from './gallery.js';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);
