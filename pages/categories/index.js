import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import CategoryCard from '../../components/categories/CategoryCard';
import { getAllCategories } from '../../utils/data/categoriesData';

function Categories() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllCategories().then((data) => {
      if (data?.length > 0) {
        setCategories(data);
      }
    });
  }, []);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Button onClick={() => router.push('/categories/new')}> Create new tag</Button>
      {
        categories.map((category) => <CategoryCard categoryObj={category} key={category.id}>{category.label}</CategoryCard>)
      }
    </div>
  );
}

export default Categories;
