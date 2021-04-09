import React, { useContext, useState } from 'react';
import Cookie from 'js-cookie';
import AppContext from '../../../context/AppContext';

const { NEXT_PUBLIC_API_URL } = process.env;

const Post = ({ post }) => {
  const [postData, updatePostData] = useState(post);
  const { user, isAuthenticated } = useContext(AppContext);
  const token = Cookie.get('jwt');

  function onChange(event) {
    updatePostData({ ...data, [event.target.name]: event.target.value });
  }

  return isAuthenticated && user.id === post.users_permissions_user.id ? (
    <div>
      <h3>{postData.title}</h3>
      <p>{postData.users_permissions_user.username}</p>
      <p>Type: {postData.post_type}</p>
      <p>Published at: {postData.published_at}</p>
      <p>Updated at: {postData.updated_at}</p>
      <p>{postData.description}</p>
    </div>
  ) : (
    <div>
      <h3>{postData.title}</h3>
      <p>{postData.users_permissions_user.username}</p>
      <p>Type: {postData.post_type}</p>
      <p>Published at: {postData.published_at}</p>
      <p>Updated at: {postData.updated_at}</p>
      <p>{postData.description}</p>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/posts/${id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}

export default Post;
