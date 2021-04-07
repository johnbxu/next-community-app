import PostList from '../components/PostList';
import { getSession, signIn, signOut } from 'next-auth/client';
import Link from 'next/link';

export default function Home({ posts, session }) {
  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
      <div>
        <Link href="/api/auth/signin">
          <button
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign In
          </button>
        </Link>
      </div>
    );
  };

  const signOutButtonNode = () => {
    if (!session) {
      return false;
    }

    return (
      <div>
        <Link href="/api/auth/signout">
          <button
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </button>
        </Link>
      </div>
    );
  };

  if (!session) {

    return (
      <div>
        {signOutButtonNode()}
        {signInButtonNode()}
        <h1>You are not authorized</h1>
      </div>
    );
  }

  return (
    <div>
      {signOutButtonNode()}
      {signInButtonNode()}
      <PostList posts={posts} />
    </div>
  );
}

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const res = await fetch(`${process.env.API_URL}/posts`);
  const posts = await res.json();

  return {
    props: {
      posts,
      session,
    },
  };
};
