import { clientCredentials } from '../client';

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories`)
    .then((res) => res.json())
    .then(resolve)
    .catch(reject);
});

export default getCategories;
