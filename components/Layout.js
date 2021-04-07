import Nav from './Nav';
import Meta from './Meta';

const Layout = ({ children }) => {
  return (
    <div className='container-lg max-w-5xl p-2 mx-auto'>
      <Meta />
      <Nav />
      <div>
        <main className="py-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
