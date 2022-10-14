// import { Axios } from 'axios';

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

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', submitHandler);
refs.loadMore.addEventListener('click', loadMoreHandler);

function submitHandler(event) {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = event.currentTarget;

  imagesApiService.query = searchQuery.value.trim().toLowerCase();

  imagesApiService.resetPage();
  imagesApiService.resetTotalPage();

  clearMarkup();

  if (searchQuery.value === '') {
    isHiddenAdd();
    return showWarningMessage();
  }

  imagesApiService
    .searchImages()
    .then(images => {
      if (images.hits.length === 0) {
        return showFailtureMessage();
      }

      showSuccessMessage(images);
      imagesRender(images);

      imagesApiService.calculateTotalPages(images.totalHits);

      if (imagesApiService.page < imagesApiService.totalPages) {
        return isHiddenRemove();
      }
    })
    .catch(error => {
      console.log(error);
    });

  searchQuery.value = '';
}

function loadMoreHandler() {
  if (imagesApiService.page > imagesApiService.totalPages) {
    isHiddenAdd();
    return showAllert();
  }

  imagesApiService.searchImages().then(images => {
    imagesRender(images);
  });
}

function imagesRender(images) {
  refs.gallery.insertAdjacentHTML('beforeend', createImagesMarkup(images.hits));
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

function isHiddenAdd() {
  refs.loadMore.classList.add('is-hidden');
}

function isHiddenRemove() {
  refs.loadMore.classList.remove('is-hidden');
}
