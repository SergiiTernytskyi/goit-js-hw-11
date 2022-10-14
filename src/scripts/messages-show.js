import { Notify } from 'notiflix';

const notifyOptions = {
  position: 'left-top',
  fontSize: '16px',
  clickToClose: true,
  width: '350px',
  timeout: 5000,
};

export function showFailtureMessage() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    notifyOptions
  );
}

export function showSuccessMessage(images) {
  Notify.success(`Hooray! We found ${images.totalHits} images.`, notifyOptions);
}

export function showWarningMessage() {
  Notify.warning(`Please enter something to search.`, notifyOptions);
}

export function showAllert() {
  Notify.failure(
    "We're sorry, there are no more posts to load.",
    notifyOptions
  );
}
