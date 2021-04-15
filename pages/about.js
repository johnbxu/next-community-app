import Meta from '../components/Meta';
import Layout from '../components/Layout';

const about = () => {
  return (
    <>
      <Meta title="about" />
      <div className="container px-2 mx-auto">
        <h1 className="text-3xl mb-2">About</h1>
        <p>Welcome! I'm John - a gamer/web developer. Enjoy the site!</p>
      </div>
    </>
  );
};

export default about;
