import Meta from '../components/Meta';
import Layout from '../components/Layout';

const about = () => {
  return (
    <>
      <Meta title="about" />
      <div className="container px-2 mx-auto">
        <h1 className="text-3xl mb-2">About</h1>
        <p className="mb-2">Welcome! I'm John - a gamer/web developer.</p>
        <p className="mb-2">
          This is a hobby project that is a work in progress. Please email
          developer@johnbxu.ca with bug reports or recommendations.
        </p>
        <p className="mb-2">Enjoy the site!</p>
      </div>
    </>
  );
};

export default about;
