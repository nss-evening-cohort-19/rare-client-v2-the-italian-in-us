import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Image } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { deleteComment, updateComment } from '../../utils/data/commentsData';
import { useAuth } from '../../utils/context/authContext';

function CommentCard({ commentObj, onCommentEditted }) {
  const { user } = useAuth();
  const [editView, setEditView] = useState(false);
  const [editComment, setEditComment] = useState(commentObj.content);

  const deleteThisComment = () => {
    if (window.confirm(`Delete ${commentObj.content}?`)) {
      deleteComment(commentObj.id).then(() => window.location.reload());
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const payload = {
      content: editComment,
      postId: commentObj.postId.id,
      authorId: commentObj.authorId.id,
      createdOn: commentObj.createdOn,
      id: commentObj.id,
    };

    updateComment(payload).then(() => {
      setEditView(false);
      onCommentEditted();
    });
  };

  const onChange = (e) => setEditComment(e.target.value);

  return (
    <Card className="text-center">
      <Card.Body className="comment-card-body">
        <Image className="comment-user-image" src={commentObj.authorId.profile_image_url} />
        {!editView ? (
          <div className="comment-edit-div">
            <Card.Text>{commentObj.content}</Card.Text>
            {commentObj?.authorId?.id === user.id && <Button variant="info" onClick={() => setEditView(true)}>EDIT</Button>}
            <Button variant="danger" onClick={deleteThisComment} className="m-2">
              DELETE
            </Button>
          </div>
        ) : (
          <div className="comment-edit-div">
            <Form className="comment-edit" onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Update comment</Form.Label>
                <input className="edit-comment-input" type="text" name="Comment" value={editComment} onChange={onChange} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
              <Button variant="primary" onClick={() => setEditView(false)}>
                Cancel
              </Button>
            </Form>
          </div>
        )}

      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.number,
    postId: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
    authorId: PropTypes.shape({
      id: PropTypes.number.isRequired,
      profile_image_url: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,

    }),
    createdOn: PropTypes.string.isRequired,
  }).isRequired,
  onCommentEditted: PropTypes.func.isRequired,
};

export default CommentCard;
