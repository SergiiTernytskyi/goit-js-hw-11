export function createImagesMarkup(imagesArr) {
  const imagesMarkup = imagesArr
    .map(images => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = images;
      return `<div class="gallery__item"><a class="gallery__link" href="${largeImageURL}"><img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" /></a><div class="info"><p class="info-item"><b>Likes:</b> ${likes}</p><p class="info-item"><b>Views:</b>${views}</p><p class="info-item"><b>Comments:</b>${comments}</p><p class="info-item"><b>Downloads:</b>${downloads}</p></div></div>`;
    })
    .join(' ');
  return imagesMarkup;
}
