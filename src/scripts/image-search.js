import axios from 'axios';

const KEY = '30592640-c7793cd5d6c6bb2f70fd4091c';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export class ImagesApiService {
  #query = '';
  #page = 1;
  #perPage = 20;
  #totalPages = 0;
  #axiosParams = {
    params: {
      safesearch: true,
      rientation: 'horizontal',
      image_type: 'photo',
    },
  };

  async searchImages() {
    const axiosUrl = `?key=${KEY}&q=${this.#query}&page=${
      this.#page
    }&per_page=${this.#perPage}`;

    const { data } = await axios.get(axiosUrl, this.#axiosParams);
    return data;
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }

  get page() {
    return this.#page;
  }

  get totalPages() {
    return this.#totalPages;
  }

  get isLoadMoreImages() {
    return this.#page < this.#totalPages;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  resetTotalPage() {
    this.#totalPages = 1;
  }

  calculateTotalPages(total) {
    this.#totalPages = Math.ceil(total / this.#perPage);
  }
}
