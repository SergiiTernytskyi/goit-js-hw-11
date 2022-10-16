import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './scripts/refs';
import { ImagesApiService } from './scripts/image-search';
import { createImagesMarkup } from './scripts/create-markup';
import {
  showFailtureMessage,
  showSuccessMessage,
  showWarningMessage,
  showAllert,
} from './scripts/messages-show';

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const imagesApiService = new ImagesApiService();
const observer = new IntersectionObserver(intersectionHandler, observerOptions);

refs.searchForm.addEventListener('submit', submitHandler);

// For load-more button
// refs.loadMore.addEventListener('click', loadMoreHandler);

async function submitHandler(event) {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = event.currentTarget;

  imagesApiService.query = searchQuery.value.trim().toLowerCase();

  imagesApiService.resetPage();
  imagesApiService.resetTotalPage();

  clearMarkup();

  // For load-more button
  // isHiddenAdd();

  if (searchQuery.value === '') {
    isHiddenAdd();
    return showWarningMessage();
  }

  try {
    const data = await imagesApiService.searchImages();

    if (data.hits.length === 0) {
      return showFailtureMessage();
    }

    showSuccessMessage(data);
    imagesRender(data);

    imagesApiService.calculateTotalPages(data.totalHits);

    searchQuery.value = '';

    if (imagesApiService.isLoadMoreImages) {
      observerSubscribe();

      // For load-more button
      // return isHiddenRemove();
    }
  } catch (error) {
    console.log(error);
  }
}

function imagesRender(data) {
  refs.gallery.insertAdjacentHTML('beforeend', createImagesMarkup(data.hits));

  simpleLightBoxUse();
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

function simpleLightBoxUse() {
  new SimpleLightbox('.gallery__link', {
    captionDelay: 250,
    captionsData: 'alt',
    overlayOpacity: 0.1,
  });
}

async function intersectionHandler(entries) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      imagesApiService.incrementPage();
      observer.unobserve(entry.target);

      try {
        const data = await imagesApiService.searchImages();
        imagesRender(data);

        if (imagesApiService.isLoadMoreImages) {
          observerSubscribe();
        }
        if (!imagesApiService.isLoadMoreImages) {
          showAllert();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
}

function observerSubscribe() {
  const target = document.querySelector('.gallery__item:last-child');
  observer.observe(target);
}

// For load-more button
async function loadMoreHandler() {
  imagesApiService.incrementPage();
  if (!imagesApiService.isLoadMoreImages) {
    isHiddenAdd();
    return showAllert();
  }

  const data = await imagesApiService.searchImages();
  imagesRender(data);
  smoothMove();
}

function isHiddenAdd() {
  refs.loadMore.classList.add('is-hidden');
}

function isHiddenRemove() {
  refs.loadMore.classList.remove('is-hidden');
}

function smoothMove() {
  const { height: photoHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();
  console.log(photoHeight);

  window.scrollBy({
    top: photoHeight * 2,
    behavior: 'smooth',
  });
}
