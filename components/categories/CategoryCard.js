import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { FaRegTrashAlt } from 'react-icons/fa';

const CategoryCard = ({ categoryObj, deleteCategory }) => (
  <div className="category-render">
    <Card className="text-center category-card">
      <Card.Body>
        <Card.Text>{categoryObj.label}</Card.Text>
      </Card.Body>
    </Card>
    <Button variant="outline-danger" type="button" className="trash" onClick={() => deleteCategory(categoryObj.id)}><FaRegTrashAlt size={30} /></Button>
  </div>
);

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

export default CategoryCard;
