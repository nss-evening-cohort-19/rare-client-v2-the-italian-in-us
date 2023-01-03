import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import CategoryCard from '../../components/categories/CategoryCard';
import { deleteThisCategory, getAllCategories } from '../../utils/data/categoriesData';

function Categories() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const getTheContent = () => {
    getAllCategories().then(setCategories);
  };

  const deleteCategory = (id) => {
    if (window.confirm('Deleting a category will delete all posts under this category.')) {
      deleteThisCategory(id).then(() => getTheContent());
    }
  };

  useEffect(() => {
    getTheContent();
  }, [router]);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Button variant="primary" onClick={() => router.push('/categories/new')}> Create new category</Button>
      {
        categories.map((category) => <CategoryCard categoryObj={category} deleteCategory={deleteCategory} key={category.id}>{category.label}</CategoryCard>)
      }
    </div>
  );
}

export default Categories;
