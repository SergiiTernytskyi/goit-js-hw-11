const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30592640-c7793cd5d6c6bb2f70fd4091c';

export class ImagesApiService {
  #query = '';
  #page = 1;
  #perPage = 20;
  #totalPages = 0;

  searchImages() {
    return fetch(
      `${BASE_URL}?key=${KEY}&q=${
        this.#query
      }&image_type=photo&orientation=horizontal&page=${this.#page}&per_page=${
        this.#perPage
      }&safesearch=true`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        this.incrementPage();
        return data;
      });
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }
}
