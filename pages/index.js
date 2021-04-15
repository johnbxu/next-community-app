import PostList from '../components/PostList';
import TopPosts from '../components/TopPosts';

export default function Home({ allPosts, classPosts }) {
  return (
    <>
      <div className="container px-2 mx-auto relative">
        <h2 className="mb-3">Top Builds</h2>
      </div>
      <TopPosts classPosts={classPosts} />
      <div className="container px-2 mx-auto relative">
        <h2 className="mb-3">Recent Builds</h2>
      </div>
      <PostList posts={allPosts} />
    </>
  );
}

export async function getStaticProps() {
  const { NEXT_PUBLIC_API_URL } = process.env;

  const allPosts = await (
    await fetch(`${NEXT_PUBLIC_API_URL}/posts?_sort=updated_at:DESC`)
  ).json();
  const classPosts = [];

  for (let i = 1; i < 5; i += 1) {
    const posts = await (
      await fetch(`${NEXT_PUBLIC_API_URL}/posts?class=${i}`)
    ).json();
    posts.sort((a, b) => b.votes - a.votes);

    const className = posts[0].class.title;
    classPosts.push({ title: className, posts });
  }

  return {
    props: {
      allPosts,
      classPosts,
    },
    revalidate: 30,
  };
}
