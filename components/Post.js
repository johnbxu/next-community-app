import Link from 'next/link';
import User from './User';
import moment from 'moment';

const Post = ({ post }) => {
  return (
    <Link
      href="/posts/[class]/[id]"
      as={`/posts/${post.class.slug}/${post.id}`}
    >
      <a>
        <div className="p-5 hover:shadow-lg border-b-2">
          <div className="flex justify-between">
            <div>{post.title}</div>
            <div>{post.class.title}</div>
          </div>
          <User user={post.author} key={post.author.id} />
          <div>Last Updated: {moment(post.updated_at).startOf('day').fromNow()}</div>
          <div>Votes: {post.votes}</div>
        </div>
      </a>
    </Link>
  );
};

export default Post;
