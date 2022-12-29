/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';
import PostCard from '../../components/Post/PostCard';
import { getAllPosts } from '../../utils/data/posts';

function AllPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const cronPosts = posts.sort((a, b) => a.publication_date - b.publication_date);

  const getTheContent = () => {
    getAllPosts().then(setPosts);
  };

  useEffect(() => {
    getTheContent();
  }, []);

  return (
    <div className="all-posts-page">
      <div className="add-post" role="button" onClick={(() => router.push('/posts/new'))} tabIndex="0">
        <h2>Add A Post</h2>
        <FaRegPlusSquare size={36} />
      </div>
      {cronPosts?.map((post) => (
        <PostCard postObj={post} onUpdate={getTheContent} />
      ))}
    </div>

  );
}

export default AllPosts;
