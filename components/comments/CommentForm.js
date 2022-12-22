import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createComment } from '../../utils/data/commentsData';
import { useAuth } from '../../utils/context/authContext';

function CommentForm({ postId, onNewCommentCreated }) {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');

  const onChange = (e) => setNewComment(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const payload = {
      postId: Number(postId),
      authorId: user.id,
      createdOn: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`,
      content: newComment,
    };
    createComment(payload).then(onNewCommentCreated());
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Create a new Comment</Form.Label>
        <input type="text" name="Comment" value={newComment} onChange={onChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

CommentForm.propTypes = {
  onNewCommentCreated: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
  // authorId: PropTypes.number.isRequired,
};

export default CommentForm;
