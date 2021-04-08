import PostList from '../components/PostList';
import { getSession, signIn, signOut } from 'next-auth/client';
import Link from 'next/link';

export default function Home({ posts, session }) {
  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.API_URL}/posts`);
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};
