
import axios from 'axios';

const API_KEY = '37136266-a42a32582919092089cbd6d65';
const BASE_URL = 'https://pixabay.com/api/';
const ITEMS_PER_PAGE = 40;

 async function fetchImages(query, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: ITEMS_PER_PAGE,
        page: page,
      },
    });
    const { data } = response;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export { fetchImages, ITEMS_PER_PAGE };