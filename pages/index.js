import PostList from '../components/PostList';

export default function Home({ posts }) {
  return (
    <PostList posts={posts} />
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
