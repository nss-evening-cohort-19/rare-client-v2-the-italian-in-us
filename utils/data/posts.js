import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getAllPosts = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deletepost = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${id}`, {
    method: 'DELETE',
  }).then(resolve).catch(reject);
});

export { getAllPosts, deletepost };
