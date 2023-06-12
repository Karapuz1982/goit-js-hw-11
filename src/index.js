

import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

Notiflix.Notify.init({});

const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
let currentPage = 1;
let currentQuery = '';
let isFetching = false;

function showSuccessNotification(message) {
  Notiflix.Notify.success(message);
}

function showErrorNotification(message) {
  Notiflix.Notify.failure(message);
}

async function fetchImages(searchQuery, page = 1) {
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

      if (currentPage < Math.ceil(totalHits / perPage)) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
      }
    }
  } catch (error) {
    console.error(error);
    showErrorNotification('An error occurred while fetching images. Please try again later.');
  } finally {
    isFetching = false;
  }
}

function createGallery(images) {
  images.forEach((image) => {
    const card = createCard(image);
    gallery.appendChild(card);
  });

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.on('show.simplelightbox', function () {
    lightbox.refresh();
  });
}

function createCard(image) {
  const card = document.createElement('div');
  card.classList.add('photo-card');

  const imgLink = document.createElement('a');
  imgLink.href = image.largeImageURL;
  imgLink.setAttribute('data-lightbox', 'gallery');
  imgLink.setAttribute('data-title', image.tags);

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';

  const info = document.createElement('div');
  info.classList.add('info');

  const likes = document.createElement('p');
  likes.classList.add('info-item');
  likes.innerHTML = `<b>Likes:</b> ${image.likes}`;

  const views = document.createElement('p');
  views.classList.add('info-item');
  views.innerHTML = `<b>Views:</b> ${image.views}`;

  const comments = document.createElement('p');
  comments.classList.add('info-item');
  comments.innerHTML = `<b>Comments:</b> ${image.comments}`;

  const downloads = document.createElement('p');
  downloads.classList.add('info-item');
  downloads.innerHTML = `<b>Downloads:</b> ${image.downloads}`;

  imgLink.appendChild(img);
  info.appendChild(likes);
  info.appendChild(views);
  info.appendChild(comments);
  info.appendChild(downloads);
  card.appendChild(imgLink);
  card.appendChild(info);

  return card;
}

function showLoadMoreButton() {
  loadMoreButton.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreButton.style.display = 'none';
}

function fetchNextPage() {
  currentPage++;
  fetchImages(currentQuery, currentPage);
}

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const query = searchForm.elements.searchQuery.value.trim();
  if (query === '') {
    showErrorNotification('Please enter a search query.');
    return;
  }
  currentPage = 1;
  currentQuery = query;
  gallery.innerHTML = '';
  fetchImages(query, currentPage);
  hideLoadMoreButton();
});

loadMoreButton.addEventListener('click', fetchNextPage);

window.addEventListener('scroll', () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    fetchNextPage();
  }
});
