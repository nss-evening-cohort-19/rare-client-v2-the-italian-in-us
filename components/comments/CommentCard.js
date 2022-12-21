import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Link from 'next/link';
import { deleteComment } from '../../utils/data/commentsData';

function CommentCard({ commentObj }) {
  const deleteThisComment = () => {
    if (window.confirm(`Delete ${commentObj.content}?`)) {
      deleteComment(commentObj.id).then(() => window.location.reload());
    }
  };

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Text>{commentObj.content}</Card.Text>
        {/* <Link href={`/comments/edit/${commentObj.id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link> */}
        <Button variant="danger" onClick={deleteThisComment} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default CommentCard;
