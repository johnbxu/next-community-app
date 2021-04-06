const Post = ({ post }) => {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.users_permissions_user.username}</p>
      <p>Type: {post.post_type}</p>
      <p>Published at: {post.published_at}</p>
      <p>Updated at: {post.updated_at}</p>
      <p>{post.description}</p>
    </div>
  );
};

const { API_URL } = process.env;

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const res = await fetch(`${API_URL}/posts/${id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}

export default Post;
