
import axios from 'axios';
import { showErrorNotification, showSuccessNotification, showEndOfResultsMessage } from './notifications.js';
import { createGallery } from './gallery.js';
import { initScrollListener } from './eventHandlers.js';


let scrollListener;
let isFetching = false;
let currentPage = 1;
let totalPages = 0;

async function fetchImages(searchQuery, page = 1, state) {
  if (isFetching) return;

  const apiKey = '37136266-a42a32582919092089cbd6d65';
  const perPage = 40;

  try {
    isFetching = true;

    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: apiKey,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });

    const { hits, totalHits } = response.data;

    if (hits.length === 0) {
      showErrorNotification('Sorry, there are no images matching your search query. Please try again.');
    } else {
      showSuccessNotification(`Hooray! We found ${totalHits} images.`);
      createGallery(hits);
      state.totalPages = Math.ceil(totalHits / perPage);
      initScrollListener(fetchImages, state);
      
      
     
    }
    if (state.currentPage >= Math.ceil(totalHits / perPage)) {
      showEndOfResultsMessage();
    }
  }




    
  catch (error) {
    console.error(error);
    showErrorNotification('An error occurred while fetching images. Please try again later.');
  } finally {
    isFetching = false;
  }
}

export { fetchImages,  showEndOfResultsMessage };
