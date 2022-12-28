import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useAuth } from '../utils/context/authContext';
import getCategories from '../utils/data/categoryData';
import { createPost, updatePost } from '../utils/data/postData';
import { getAllTags } from '../utils/data/tagData';

export default function PostForm({ post }) {
  const { user } = useAuth();
  const date = new Date().toISOString().slice(0, 10);
  const initialState = {
    publicationDate: date,
    uid: user.uid,
    content: '',
    title: '',
    imageUrl: '',
  };
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selected, setSelected] = useState([]);
  const router = useRouter();

  const tagOptions = tags.map((tag) => (
    {
      value: tag.id,
      label: tag.label,
    }
  ));

  useEffect(() => {
    getCategories().then(setCategories);
    getAllTags().then(setTags);
    if (post?.id) setFormInput(post);
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const tagHandleChange = (selectedOptions) => {
    setSelected(selectedOptions.map((option) => option.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post?.id) {
      updatePost({ ...formInput, editedOn: date }).then(() => router.push('/posts'));
    } else {
      createPost({ ...formInput, tagIds: selected }).then(() => router.push('/posts'));
    }
  };

  return (
    <>
      <h1>Add A Post</h1>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
          <Form.Control type="text" placeholder="Enter Title" name="title" value={formInput.title} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Image Url" className="mb-3">
          <Form.Control type="text" placeholder="Enter Image Url" name="imageUrl" value={formInput.imageUrl} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Content" className="mb-3">
          <Form.Control type="text" placeholder="Enter Content" name="content" value={formInput.content} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="Category">
          <Form.Select aria-label="Category" name="category" onChange={handleChange} className="mb-3" value={formInput.category} required>
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.label} selected={category.id === formInput.category} value={category.id}>
                {category.label}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Tags">
          <Select
            isMulti
            name="tags"
            options={tagOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={tagHandleChange}
            required
          />
        </FloatingLabel>

        <Button type="submit">{post?.id ? 'Update' : 'Submit'} Post</Button>
      </Form>
    </>
  );
}

PostForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.number.isRequired,
  }).isRequired,
};
