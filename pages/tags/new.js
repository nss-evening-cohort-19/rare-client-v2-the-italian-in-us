import TagForm from '../../components/tags/TagForm';

function NewTag() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <TagForm />
    </div>
  );
}

export default NewTag;
