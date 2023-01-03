import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
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

  const handleKeyDown = (e) => {
    const { id } = e.target;
    if (e.keyCode === 13) {
      if (id === 'post') {
        router.push(`/posts/${postObj.id}`);
      } else {
        router.push(`/users/${postObj.user_id.id}`);
      }
    }
  };

  return (
    <Card className="post-card">
      <Card.Header className="post-card-header">
        <div id="user" className="post-card-user-div" role="button" onClick={() => router.push(`/users/${postObj.user_id.id}`)} onKeyDown={handleKeyDown} tabIndex="0">
          <Image className="post-card-user-image" src={postObj.user_id.profile_image_url} />
          <Link href={`/users/${postObj.user_id.id}`} passHref>
            <Card.Text className="profileUserName">{postObj.user_id.first_name}{postObj.user_id.last_name}</Card.Text>
          </Link>
        </div>
        <Card.Text>Posted In: {postObj.category_id.label}</Card.Text>
        <Card.Text>Published: {postObj.publication_date}</Card.Text>
      </Card.Header>
      <div id="post" type="button" onClick={() => router.push(`/posts/${postObj.id}`)} onKeyDown={handleKeyDown} role="button" tabIndex="0">
        <Card.Body className="post-card-body">
          <div className="post-card-title-content">
            <Card.Title>{postObj.title}</Card.Title>
            <Card.Text className="post-card-content">{postObj.content}</Card.Text>
          </div>
          <Image className="post-card-post-image" src={postObj.image_url} />
          <div>
            {postObj?.tags_on_posts?.map((tag) => (
              <span>#{tag}</span>
            ))}
          </div>
        </Card.Body>
      </div>
      <Card.Footer className="post-card-footer">
        <Reactions postId={postObj.id} />
        {user.id === postObj.user_id.id ? (
          <div className="post-card-buttons">
            <Button variant="outline-dark" type="button" className="gear" onClick={() => router.push(`/posts/edit/${postObj.id}`)}><FaHubspot size={30} /></Button>
            <Button variant="outline-dark" type="button" className="trash" onClick={() => deletePost()}><FaRegTrashAlt size={30} /></Button>
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
    tags_on_posts: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
