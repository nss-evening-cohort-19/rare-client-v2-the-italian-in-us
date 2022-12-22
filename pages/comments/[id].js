import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllCommentsByPost } from '../../utils/data/commentsData';
import CommentCard from '../../components/comments/CommentCard';
import CommentForm from '../../components/comments/CommentForm';

export default function ViewComments() {
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  // Added timeout delay to fix the race condition of reading comments data soon after creation of new comments.
  const onNewCommentCreated = () => setTimeout(() => getAllCommentsByPost(id).then((commentsData) => setComments(commentsData)), 300);

  useEffect(() => {
    getAllCommentsByPost(id).then((commentsData) => setComments(commentsData));
  }, [id]);

  const renderComments = () => ((comments.length > 0) ? comments.map((comment) => <CommentCard commentObj={comment} key={comment.id} onCommentEditted={onNewCommentCreated}>{comment.content}</CommentCard>) : (<div> No comments found for the post</div>));

  return (
    <div style={{ display: 'flex' }}>
      <div>{renderComments()}</div>
      <CommentForm onNewCommentCreated={onNewCommentCreated} postId={id} />
    </div>
  );
}
