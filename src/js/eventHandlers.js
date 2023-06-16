// export { initSearchForm, initLoadMoreButton, initScrollListener };
import { showErrorNotification } from './notifications.js';
import { fetchImages } from './api.js';

function initSearchForm(fetchImages, state) {
  const searchForm = document.querySelector('.search-form');
  const gallery = document.querySelector('.gallery');

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const query = searchForm.elements.searchQuery.value.trim();
    if (query === '') {
      showErrorNotification('Please enter a search query.');
      return;
    }
    gallery.innerHTML = '';
    state.currentPage = 1;
    state.currentQuery = query;
    fetchImages(query, state.currentPage, state);
  });
}

function initScrollListener(fetchImages, state) {
   window.addEventListener('scroll',() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {

      if (state.currentPage < state.totalPages) {
        state.currentPage += 1;
        fetchImages(state.currentQuery, state.currentPage, state);
      }
    }
  });
}

export { initSearchForm, initScrollListener };
