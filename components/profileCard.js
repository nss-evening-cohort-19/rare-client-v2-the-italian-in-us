/* eslint-disable no-nested-ternary */
/* import Link from 'next/link';
 */import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { createSubscription, deleteSubscription } from '../utils/data/subscriptionData';

function ProfileCard({ userProfile, user, onUpdate }) {
  const date = new Date().toISOString().slice(0, 10);

  const unSubscribe = () => {
    const subToDelete = userProfile.subscribers.filter((sub) => sub.follower_id === user.id);
    deleteSubscription(subToDelete[0].id).then(() => onUpdate());
  };

  const subscribe = () => {
    const sub = {
      followerId: user.id,
      authorId: userProfile.id,
      createdOn: date,
    };
    createSubscription(sub).then(() => onUpdate());
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{userProfile.firstName} {userProfile.lastName}</Card.Title>
        <Card.Text>
          Email: {userProfile.email}
        </Card.Text>
        <Card.Text>
          Creation Date: {userProfile.createdOn}
        </Card.Text>
        <Card.Text>
          Profile Type: {userProfile.isStaff ? <div>Admin</div> : <div>Basic</div>}
        </Card.Text>
        {
          userProfile.id === user.id ? (
            <div />
          ) : userProfile.subbed ? (
            <Button onClick={unSubscribe}>Unsubscribe</Button>
          ) : (
            <Button onClick={subscribe}>Subscribe</Button>
          )
        }
      </Card.Body>
    </Card>
  );
}

ProfileCard.propTypes = {
  userProfile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    createdOn: PropTypes.string.isRequired,
    isStaff: PropTypes.bool.isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    subbed: PropTypes.bool.isRequired,
    subscribers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProfileCard;
