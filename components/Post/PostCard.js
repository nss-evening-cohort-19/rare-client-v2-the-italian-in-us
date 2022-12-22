import React from 'react';
import { Card, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

function PostCard({ postObj }) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>{postObj.title}</Card.Title>
        <Image src={postObj.user_id.profile_image_url} />
        <Card.Text>{postObj.user_id.first_name}{postObj.user_id.last_name}</Card.Text>
      </Card.Header>
      <div>
        <Image src={postObj.image_url} />
      </div>
      <Card.Body>
        <h3>{postObj.category_id.label}</h3>
        <Card.Text>{postObj.content}</Card.Text>
      </Card.Body>
      <Card.Footer>{postObj.publication_date}</Card.Footer>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    title: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    publication_date: PropTypes.string,
    user_id: PropTypes.shape({
      profile_image_url: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
    category_id: PropTypes.shape({
      label: PropTypes.string,
    }),
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
