import React, { useState, useEffect } from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaHubspot, FaRegTrashAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Reactions from '../Reactions';
import { useAuth } from '../../utils/context/authContext';
import { deletepost } from '../../utils/data/posts';
import { getCategoryById } from '../../utils/data/categoryData';

function PostList({ postObj, author, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();
  const [category, setCategory] = useState({});

  const deletePost = () => {
    if (window.confirm('Are you sure you want to delete ?')) {
      deletepost(postObj.id).then(onUpdate);
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

  useEffect(() => {
    getCategoryById(postObj.category_id).then(setCategory);
  }, [postObj]);

  return (
    <Card className="post-card">
      <Card.Header className="post-card-header">
        <div className="post-card-user-div">
          <Image className="post-card-user-image" src={author.profileImageUrl} />
          <Card.Text className="profileUserName">{author.firstName}{author.lastName}</Card.Text>
        </div>
        <Card.Text>Posted In: {category?.label}</Card.Text>
        <Card.Text>Published: {postObj.publication_date}</Card.Text>
      </Card.Header>
      <div id="post" type="button" onClick={() => router.push(`/posts/${postObj.id}`)} onKeyDown={handleKeyDown} role="button" tabIndex="0">
        <Card.Body className="post-card-body">
          <div className="post-card-content-div">
            <div className="post-card-title-content">
              <Card.Title>{postObj.title}</Card.Title>
              <Card.Text className="post-card-content">{postObj.content}</Card.Text>
              <div className="post-card-tags">
                {postObj?.tags_on_posts?.map((tag) => (
                  <Card.Text className="post-card-tag">#{tag}</Card.Text>
                ))}
              </div>
            </div>
            <Image className="post-card-post-image" src={postObj.image_url} />
          </div>
        </Card.Body>
      </div>
      <Card.Footer className="post-card-footer">
        <Reactions postId={postObj.id} />
        {user.id === postObj.user_id ? (
          <div className="post-card-buttons">
            <Button variant="outline-dark" type="button" className="gear" onClick={() => router.push(`/posts/edit/${postObj.id}`)}><FaHubspot size={30} /></Button>
            <Button variant="outline-dark" type="button" className="trash" onClick={() => deletePost()}><FaRegTrashAlt size={30} /></Button>
          </div>
        ) : ''}
      </Card.Footer>
    </Card>
  );
}

PostList.propTypes = {
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
  author: PropTypes.shape({
    id: PropTypes.number.isRequired,
    profileImageUrl: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostList;
