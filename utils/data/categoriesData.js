import { clientCredentials } from '../client';

const getAllCategories = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getCategoriesById = (id) => fetch(`http://localhost:8000/categories/${id}`)
  .then((response) => response.json());

const createCategory = (category) => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/categories', {
    method: 'POST',
    body: JSON.stringify(category),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const updateCategory = (category) => fetch(`http://localhost:8000/categories/${category.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.warn('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

const deleteThisCategory = (id) => fetch(`http://localhost:8000/games/${id}`, {
  method: 'DELETE',
});

export {
  getAllCategories, getCategoriesById, createCategory, updateCategory, deleteThisCategory,
};
