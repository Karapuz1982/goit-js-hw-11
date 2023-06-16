
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

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

export { createGallery };
