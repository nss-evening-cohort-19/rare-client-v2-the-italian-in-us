/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PostCard from '../../../components/Post/PostCard';
import { getCustomFeed } from '../../../utils/data/postData';

export default function CustomFeed() {
  const [feed, setCustomFeed] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const cronPosts = feed.sort((a, b) => a.publication_date - b.publication_date);

  const getTheFeed = () => {
    getCustomFeed(id).then(setCustomFeed);
  };

  useEffect(() => {
    getTheFeed();
  }, []);

  return (
    cronPosts?.map((post) => (
      <PostCard postObj={post} onUpdate={getTheFeed} />
    ))
  );
}
