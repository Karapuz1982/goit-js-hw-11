
import Notiflix from 'notiflix';
import { fetchImages, ITEMS_PER_PAGE } from './api.js';
import { renderImages, clearGallery } from './gallery.js';

let currentPage = 1;
let currentQuery = '';
let error = null;
let totalHits = 0;

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleSubmit(event) {
    event.preventDefault();
   const newQuery = searchForm.elements.searchQuery.value.trim(); 
  
  if (newQuery !== currentQuery) {
    currentPage = 1;
  currentQuery = newQuery;
  clearGallery();
  error = null;
    totalHits = 0;
   loadMoreBtn.style.display = 'none'; 
    }
    
    if (currentQuery === '') {
    error = new Error('Please enter a search query.');
    handleErrors();
        return;
        
      }  
  await fetchAndRenderImages(currentQuery, currentPage);
  handleErrors();
}

async function loadMoreImages() {
  currentPage +=1;
  await fetchAndRenderImages(currentQuery, currentPage);
  handleErrors();
}

async function fetchAndRenderImages(query, page) {
  try {
    const data = await fetchImages(query, page);

    
  
      

    if (data.hits.length === 0) {
        error = new Error('Sorry, there are no images matching your search query. Please try again.');
        loadMoreBtn.style.display = 'none';
      return;
    }

    renderImages(data.hits);
    totalHits = data.totalHits;

    if (currentPage === 1) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        loadMoreBtn.style.display = 'none';
    }

    const loadedImagesCount = currentPage * ITEMS_PER_PAGE;
    if (loadedImagesCount >= totalHits) {
      loadMoreBtn.style.display = 'none';
      const lastRowImages = document.querySelectorAll('.photo-card:last-child');
      const lastImage = lastRowImages[lastRowImages.length - 1];
      const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      });
      observer.observe(lastImage);
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (err) {
    error = err;
    handleErrors();
  }
}

// function handleIntersection(entries, observer) {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//       observer.unobserve(entry.target);
//     }function handleIntersection(entries, observer) {
 function handleIntersection(entries, observer) {
  const lastEntry = entries[entries.length - 1];
  if (lastEntry.isIntersecting) {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    observer.unobserve(lastEntry.target);
  }
}



  


function handleErrors() {
  if (error) {
   
    Notiflix.Notify.info(error.message);
  }
}

export { handleSubmit, loadMoreImages };




