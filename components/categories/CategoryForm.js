import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createCategory } from '../../utils/data/categoriesData';

function CategoryForm() {
  const [newCategory, setNewCategory] = useState('');
  const router = useRouter();

  const onChange = (e) => setNewCategory(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      label: newCategory,
    };
    createCategory(payload).then(() => {
      router.replace('/categories');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Create a new category</Form.Label>
        <input type="text" name="category" value={newCategory} onChange={onChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CategoryForm;
