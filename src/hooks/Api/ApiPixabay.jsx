import axios from 'axios';

export async function SearchImages(query, page) {
  const BASE_URL = `https://pixabay.com/api/`;
  const KEY = '35822629-b9359d31660fe7f3ad5b1d613';
  const options = `image_type=photo&orientation=horizontal&per_page=12`;
  try {
    const resolve = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${query}&${options}&page=${page}`
    );
    return resolve.data;
  } catch (error) {
    console.log(error);
  }
}







