import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import TagCard from '../../components/tags/TagCard';
import { getAllTags } from '../../utils/data/tagData';

function Tags() {
  const [tags, setTags] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllTags().then((data) => {
      if (data && data.length > 0) {
        setTags([...data]);
      }
    });
  }, []);

  const renderTags = () => {
    if (tags && tags.length > 0) {
      return tags.map((tag) => <TagCard tagObj={tag} key={tag.id} />);
    }
    return (<div>No tag data found</div>);
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Button onClick={() => router.push('/tags/new')}> Create new tag</Button>
      {renderTags()}
    </div>
  );
}

export default Tags;
