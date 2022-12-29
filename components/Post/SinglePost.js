import React from 'react';
import { Card, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaHubspot, FaRegTrashAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Reactions from '../Reactions';
import { useAuth } from '../../utils/context/authContext';

function SinglePost({ postObj, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();

  const deletePost = () => {
    if (window.confirm('Are you sure you want to delete ?')) {
      deletePost(postObj.id).then(onUpdate);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      router.push(`/users/${postObj.userId.id}`);
    }
  };

  return (
    <Card className="single-post">
      <Card.Header className="single-post-header">
        <div id="user" role="button" onClick={() => router.push(`/users/${postObj?.userId.id}`)} onKeyDown={handleKeyDown} tabIndex="0">
          <div className="post-user-div">
            <Image className="post-user-image" src={postObj.userId?.profile_image_url} />
            <Card.Text>{postObj.userId?.first_name}{postObj.userId?.last_name}</Card.Text>
          </div>
        </div>
        <Card.Text>Posted In: {postObj.category?.label}</Card.Text>
        <Card.Text>Published: {postObj?.publicationDate}</Card.Text>
      </Card.Header>
      <Card.Body className="post-body">
        <Card.Title>{postObj.title}</Card.Title>
        <Image className="post-image" src={postObj.imageUrl} />
      </Card.Body>
      <Card.Text className="post-content">{postObj.content}</Card.Text>
      <Card.Footer className="post-card-footer">
        <Reactions postId={postObj?.id} />
        {user.id === postObj.userId?.id ? (
          <div className="post-buttons">
            <icon type="button" className="gear" onClick={() => router.push(`/posts/edit/${postObj.id}`)}><FaHubspot size={30} /></icon>
            <icon type="button" className="trash" onClick={() => deletePost()}><FaRegTrashAlt size={30} /></icon>
          </div>
        ) : ''}
      </Card.Footer>
    </Card>
  );
}

SinglePost.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
    publicationDate: PropTypes.string,
    userId: PropTypes.shape({
      id: PropTypes.number,
      profile_image_url: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
    category: PropTypes.shape({
      label: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SinglePost;
