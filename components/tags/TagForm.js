import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createTag } from '../../utils/data/tagData';

function TagForm() {
  const [newTag, setNewTag] = useState('');
  const router = useRouter();

  const onChange = (e) => setNewTag(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      label: newTag,
    };
    createTag(payload).then(() => {
      router.replace('/tags');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Create a new tag</Form.Label>
        <input type="text" name="tag" value={newTag} onChange={onChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default TagForm;
