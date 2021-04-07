import Link from 'next/link';

const Nav = () => {
  return (
    <nav>
      <ul className='flex items-center flex-wrap bg-teal-500 py-6'>
        <li className='mr-2'>
          <Link href="/">Home</Link>
        </li>
        <li className='mr-2'>
          <Link href="/about">About</Link>
        </li>
        <li className='mr-2'>
          <Link href="/posts/new">New</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
