import Nav from './Nav';
import Meta from './Meta';

const Layout = ({ props, children }) => {
  return (
    <>
      <div className="main-background fixed"></div>
      <Meta />
      <Nav />
      <div>
        <main className="py-10">{children}</main>
      </div>
    </>
  );
};

export default Layout;
