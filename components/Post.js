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
        <div className={`p-3 hover:shadow-lg border-b-2 flex justify-between post class-${post.class.slug}`}>
          <div>
            <div>{post.title}</div>
            <User user={post.author} key={post.author.id} />
            <div>
              Last Updated: {moment(post.updated_at).startOf('day').fromNow()}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div>{post.class.title}</div>
            <div>&uarr; {post.votes}</div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Post;
