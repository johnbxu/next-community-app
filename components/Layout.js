import Nav from './Nav';
import Meta from './Meta';

const Layout = ({ props, children }) => {
  return (
    <>
      <div className="main-background fixed"></div>
      <div className="container-lg max-w-5xl p-2 mx-auto relative">
        <Meta />
        <Nav />
        <div>
          <main className="py-10">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
