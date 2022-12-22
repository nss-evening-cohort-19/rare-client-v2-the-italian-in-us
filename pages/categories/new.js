import CategoryForm from '../../components/categories/CategoryForm';

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
      <CategoryForm />
    </div>
  );
}

export default NewTag;
