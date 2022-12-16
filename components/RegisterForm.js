import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [firstName, lastName] = user.fbUser.displayName.split(' ');
  const date = new Date().toISOString().slice(0, 10);

  const [formData, setFormData] = useState({
    bio: '',
    uid: user.uid,
    firstName,
    lastName,
    email: user.fbUser.email,
    profileImageUrl: user.fbUser.photoURL,
    createdOn: date,
    active: true,
    is_staff: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Gamer Bio</Form.Label>
        <Form.Control as="textarea" name="bio" required placeholder="Enter your Bio" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Text className="text-muted">Let other users know a little bit about you...</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    fbUser: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      photoURL: PropTypes.string.isRequired,
    }),
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
