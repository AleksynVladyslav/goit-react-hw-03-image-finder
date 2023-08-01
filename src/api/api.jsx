import axios from 'axios';

export const fetchImagesWithQuery = async (searchQuery, fetchPage) => {
  const API = 'https://pixabay.com/api/?';
  const KEY = '29399039-4460efa4eda80960e71e08ca2';
  const response = await axios.get(
    `${API}q=${searchQuery}&page=${fetchPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
