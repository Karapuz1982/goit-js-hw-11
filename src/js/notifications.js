
import Notiflix from 'notiflix';

Notiflix.Notify.init({});

function showSuccessNotification(message) {
  Notiflix.Notify.success(message);
}

function showErrorNotification(message) {
  Notiflix.Notify.failure(message);
}

function showEndOfResultsMessage() {
  showErrorNotification("We're sorry, but you've reached the end of search results.");
}

export { showSuccessNotification, showErrorNotification, showEndOfResultsMessage };
