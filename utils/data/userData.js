import { clientCredentials } from '../client';

const getSingleUser = (userId, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${userId}`, {
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        uid: data.uid,
        firstName: data.first_name,
        lastName: data.last_name,
        bio: data.bio,
        profileImageUrl: data.profile_image_url,
        email: data.email,
        createdOn: data.created_on,
        active: data.active,
        isStaff: data.is_staff,
        subscribers: data.subscribers,
        posts: data.posts,
        following: data.following,
        subbed: data.subbed,
      });
    })
    .catch((error) => reject(error));
});

export default getSingleUser;
