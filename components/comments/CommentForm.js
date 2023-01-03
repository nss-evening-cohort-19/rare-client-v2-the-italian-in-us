import React, { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
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
    createComment(payload).then(onNewCommentCreated);
    setNewComment('');
  };

  return (
    <Form className="comment-form-div" onSubmit={handleSubmit}>
      <Form.Group className="comment-form">
        <Image className="comment-user-image" src={user.fbUser.photoURL} />
        <Form.Label>Create a new Comment</Form.Label>
        <input className="comment-form-input" type="text" name="Comment" value={newComment} onChange={onChange} />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}

CommentForm.propTypes = {
  onNewCommentCreated: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  // authorId: PropTypes.number.isRequired,
};

export default CommentForm;
