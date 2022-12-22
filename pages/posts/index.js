import React, { useEffect, useState } from 'react';
import PostCard from '../../components/post/PostCard';
import { getAllPosts } from '../../utils/data/posts';
// import PostCard from '../../components/Post/PostCard';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const cronPosts = posts.sort((a, b) => a.publication_date - b.publication_date);

  const getTheContent = () => {
    getAllPosts().then(setPosts);
  };

  useEffect(() => {
    getTheContent();
  }, []);

  return (
    cronPosts?.map((post) => (
      <PostCard postObj={post} onUpdate={getTheContent} />
    ))
  );
}

export default AllPosts;
