import React from 'react';
import { Card, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaHubspot, FaRegTrashAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Reactions from '../Reactions';
import { useAuth } from '../../utils/context/authContext';

function PostCard({ postObj, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();

  const deletePost = () => {
    if (window.confirm('Are you sure you want to delete ?')) {
      deletePost(postObj.id).then(onUpdate);
    }
  };

  return (
    <Card className="post-card">
      <Card.Header className="post-card-header">
        <div className="post-card-user-div">
          <Image className="post-card-user-image" src={postObj.user_id.profile_image_url} />
          <Link href={`/users/${postObj.user_id.id}`} passHref>
            <Card.Text className="profileUserName">{postObj.user_id.first_name}{postObj.user_id.last_name}</Card.Text>
          </Link>
        </div>
        <Card.Text>Posted In: {postObj.category_id.label}</Card.Text>
        <Card.Text>Published: {postObj.publication_date}</Card.Text>
      </Card.Header>
      <Card.Body class>
        <Card.Title>{postObj.title}</Card.Title>
        <Image className="post-card-post-image" src={postObj.image_url} />
        <Card.Text>{postObj.content}</Card.Text>
        <Card.Text>
          Tags: {}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="post-card-footer">
        <Reactions postId={postObj.id} />
        {user.id === postObj.user_id.id ? (
          <div className="post-card-buttons">
            <icon type="button" className="gear" onClick={() => router.push(`/posts/edit/${postObj.id}`)}><FaHubspot size={30} /></icon>
            <icon type="button" className="trash" onClick={() => deletePost()}><FaRegTrashAlt size={30} /></icon>
          </div>
        ) : ''}
      </Card.Footer>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    publication_date: PropTypes.string,
    user_id: PropTypes.shape({
      id: PropTypes.number,
      profile_image_url: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
    category_id: PropTypes.shape({
      label: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
