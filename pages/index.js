import PostList from '../components/PostList';

export default function Home({ posts }) {
  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const {API_URL} = process.env
  const res = await fetch(
    `${API_URL}/posts`
  );
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};


// export const getStaticProps = async () => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts?_limit=6`
//   );
//   const articles = await res.json();

//   return {
//     props: {
//       articles,
//     },
//   };
// };
