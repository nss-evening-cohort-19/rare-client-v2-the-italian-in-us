import { clientCredentials } from '../client';

const createPost = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
    method: 'POST',
    body: JSON.stringify({
      uid: payload.uid,
      category: payload.categoryId,
      title: payload.title,
      publication_date: payload.publicationDate,
      image_url: payload.imageUrl,
      content: payload.content,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updatePost = (post) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: post.title,
      edited_on: post.editedOn,
      image_url: post.imageUrl,
      content: post.content,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

export { createPost, updatePost };
