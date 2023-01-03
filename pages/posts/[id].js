/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../utils/data/postData';
import SinglePost from '../../components/Post/SinglePost';
import CommentForm from '../../components/comments/CommentForm';
import { getAllCommentsByPost } from '../../utils/data/commentsData';
import CommentCard from '../../components/comments/CommentCard';

function SinglePostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const getTheContent = () => {
    getSinglePost(id).then(setPost);
    getAllCommentsByPost(id).then(setComments);
  };

  const onNewCommentCreated = () => setTimeout(() => getAllCommentsByPost(id).then((commentsData) => setComments(commentsData)), 300);

  useEffect(() => {
    getTheContent();
  }, [id]);

  const renderComments = () => ((comments.length > 0) ? comments.map((comment) => <CommentCard commentObj={comment} key={comment.id} onCommentEditted={onNewCommentCreated}>{comment.content}</CommentCard>) : (<div> No comments found for the post</div>));

  return (
    <>
      <SinglePost postObj={post} onUpdate={getTheContent} />
      <CommentForm onNewCommentCreated={onNewCommentCreated} postId={id} />
      <div>{renderComments()}</div>
    </>
  );
}

export default SinglePostPage;
