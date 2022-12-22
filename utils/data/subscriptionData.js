import { clientCredentials } from '../client';

const createSubscription = (sub) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/subscriptions`, {
    method: 'POST',
    body: JSON.stringify({
      follower_id: sub.followerId,
      author_id: sub.authorId,
      created_on: sub.createdOn,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteSubscription = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/subscriptions/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(resolve)
    .catch((error) => reject(error));
});

export { createSubscription, deleteSubscription };
