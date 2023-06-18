
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a');

 function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const items = images.map(
    ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes:</b> ${likes}
        </p>
        <p class="info-item">
          <b>Views:</b> ${views}
        </p>
        <p class="info-item">
          <b>Comments:</b> ${comments}
        </p>
        <p class="info-item">
          <b>Downloads:</b> ${downloads}
        </p>
      </div>
    </div>
  `
  );
  gallery.insertAdjacentHTML('beforeend', items.join(''));
  lightbox.refresh();
}

 function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}
export { renderImages, clearGallery };