import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PostCard from '../../components/Post/PostCard';
import { getAllPosts } from '../../utils/data/posts';
// import PostCard from '../../components/Post/PostCard';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const cronPosts = posts.sort((a, b) => a.publication_date - b.publication_date);
  const router = useRouter();

  const getTheContent = () => {
    getAllPosts().then(setPosts);
  };

  useEffect(() => {
    getTheContent();
  }, []);

  return (
    <>
      {cronPosts?.map((post) => (
        <PostCard postObj={post} onUpdate={getTheContent} />))}
      <Button onClick={() => router.push('/posts/new')}>New Post</Button>
    </>

  );
}

export default AllPosts;
