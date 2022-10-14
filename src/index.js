import { Notify } from 'notiflix';
// import { Axios } from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './scripts/refs';
import { ImagesApiService } from './scripts/image-search';
import { createImagesMarkup } from './scripts/create-markup';

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

  imagesApiService
    .searchImages()
    .then(images => {
      clearMarkup();
      imagesRender(images);
    })
    .catch(error => {
      console.log(error);
    });

  searchQuery.value = '';
}

function loadMoreHandler() {
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
