import React, { useEffect, useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import PostList from '../../components/PostList';
import Cookie from 'js-cookie';

const Posts = () => {
  const { user } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const token = Cookie.get('jwt');
  useEffect(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts?author=${user.id}`
    );
    const posts = await res.json();
    setPosts(posts);
  }, []);
  return (
    <>
      <PostList posts={posts}></PostList>
    </>
  );
};

export default Posts;
