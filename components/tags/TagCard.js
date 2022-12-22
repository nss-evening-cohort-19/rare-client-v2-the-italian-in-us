import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { deleteTag } from '../../utils/data/tagData';

const TagCard = ({ tagObj }) => {
  const deleteSingleTag = () => {
    if (window.confirm(`Delete ${tagObj.label}?`)) {
      deleteTag(tagObj.id).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Text>{tagObj.label}</Card.Text>
        <Button variant="danger" onClick={deleteSingleTag} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
};

TagCard.propTypes = {
  tagObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
};

export default TagCard;
