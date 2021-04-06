import Link from 'next/link';
import User from './User';

const Post = ({ post }) => {
  return (
    <Link href="/posts/[class]/[id]" as={`/posts/${post.class.slug}/${post.id}`}>
      <a>
        <div className="border-2 border-black rounded mb-5 p-5 hover:shadow-lg">
          <h3>{post.title}</h3>
          <p>{post.post_type}</p>
          <User
            user={post.users_permissions_user}
            key={post.users_permissions_user.id}
          />
          <p>Published at: {post.published_at}</p>
          <p>Updated at: {post.updated_at}</p>
        </div>
      </a>
    </Link>
  );
};

export default Post;
