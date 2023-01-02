import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { FaRegTrashAlt } from 'react-icons/fa';

const CategoryCard = ({ categoryObj, deleteCategory }) => (
  <Card className="text-center">
    <Card.Body>
      <Card.Text>{categoryObj.label}</Card.Text>
      <Button variant="outline-dark" type="button" className="trash" onClick={() => deleteCategory(categoryObj.id)}><FaRegTrashAlt size={30} /></Button>
    </Card.Body>
  </Card>
);

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

export default CategoryCard;
