import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getAllPosts = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getAllPosts };
