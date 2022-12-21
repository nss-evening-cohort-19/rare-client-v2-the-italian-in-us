import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createComment } from '../../utils/data/commentsData';

function CommentForm({ postId, onNewCommentCreated }) {
  const [newComment, setNewComment] = useState('');

  const onChange = (e) => setNewComment(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      postId: Number(postId),
      authorId: '',
      createdOn: '',
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
};

export default CommentForm;
