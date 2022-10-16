export function createImagesMarkup(imagesArr) {
  const imagesMarkup = imagesArr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="gallery__item link" href="${largeImageURL}">
        <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy"/>
        <div class="info"><p class="info-item"><b>Likes:</b> ${likes}</p>
        <p class="info-item"><b>Views:</b>${views}</p>
        <p class="info-item"><b>Comments:</b>${comments}</p>
        <p class="info-item"><b>Downloads:</b>${downloads}</p></div></a>`;
      }
    )
    .join('');
  return imagesMarkup;
}
