

import { initSearchForm, initScrollListener } from './eventHandlers.js';
import { fetchImages } from './api.js';

function initApp() {
  const state = {
    currentPage: 1,
    currentQuery: '',
    isFetching: false,
    totalPages: 0,
  };

  initSearchForm(fetchImages, state);
  initScrollListener(fetchImages, state);
}

initApp();




