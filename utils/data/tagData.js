import { clientCredentials } from '../client';

const getAllTags = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createTag = (tag) => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/tags', {
    method: 'POST',
    body: JSON.stringify(tag),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const deleteTag = (id) => fetch(`http://localhost:8000/tags/${id}`, {
  method: 'DELETE',
});

export {
  getAllTags, createTag, deleteTag,
};
