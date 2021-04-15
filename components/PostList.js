import Post from './Post';

const PostList = ({ posts }) => {
  return (
    <div className="container px-2 mx-auto">
      <div className="flex flex-col border-gray-350 rounded border-2 post-list">
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
