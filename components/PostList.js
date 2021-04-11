import Post from './Post'

const PostList = ({ posts }) => {
  return (
    <div className="flex flex-col border-gray-350 rounded border-2">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
