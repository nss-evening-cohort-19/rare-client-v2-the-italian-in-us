import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { getAllCommentsByPost } from '../../utils/data/commentsData';
import CommentCard from '../../components/comments/CommentCard';
import CommentForm from '../../components/comments/CommentForm';

export default function ViewComments() {
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const fetchAllCommentsForPost = useCallback(() => getAllCommentsByPost(id).then((commentsData) => setComments(commentsData)), [id]);

  useEffect(() => {
    fetchAllCommentsForPost();
  }, [fetchAllCommentsForPost, id]);

  const renderComments = () => {
    if (comments.length > 0) {
      return comments.map((comment) => <CommentCard commentObj={comment} key={comment.id}>{comment.content}</CommentCard>);
    }
    return (<div> No comments found for the post</div>);
  };

  return (
    <div>
      {renderComments()}
      <div>
        <CommentForm onNewCommentCreated={fetchAllCommentsForPost} postId={id} />
      </div>
    </div>
  );
}
