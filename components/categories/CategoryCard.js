import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const CategoryCard = ({ categoryObj }) => (
  <Card className="text-center">
    <Card.Body>
      <Card.Text>{categoryObj.label}</Card.Text>
    </Card.Body>
  </Card>
);

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
};

export default CategoryCard;
