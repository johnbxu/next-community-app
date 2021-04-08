import PostList from '../components/PostList';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home({ posts }) {
  return (
    <Layout>
      <PostList posts={posts} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};
