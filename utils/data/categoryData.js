import { clientCredentials } from '../client';

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories`)
    .then((res) => res.json())
    .then(resolve)
    .catch(reject);
});

const getCategoryById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { getCategories, getCategoryById };
