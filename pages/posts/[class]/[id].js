import React, { useContext, useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import Router from 'next/router';
import AppContext from '../../../context/AppContext';
import PostFull from '../../../components/PostFull';

const { NEXT_PUBLIC_API_URL } = process.env;

const Post = ({ post, classSkills, classIds }) => {
  const { user, isAuthenticated, setUser } = useContext(AppContext);
  // const userVoted = user.upvoted_posts.filter(upvotedPost => post.id === upvotedPost.id).length > 0
  // const [voted, setVoted] = useState(userVoted);
  post.classChoice = post.class.title;
  const [postData, updatePostData] = useState(post);
  const token = Cookie.get('jwt');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  function onChange(event) {
    updatePostData({ ...postData, [event.target.name]: event.target.value });
  }

  function toggleSkill(skillId) {
    const { classChoice, classSkills } = postData;
    let { skills } = postData;
    const requiredSkills = classSkills[classChoice].filter(
      (classChoice) => classChoice.node_id === skillId
    )[0].prev_nodes;

    let checker = (arr, target) => target.every((v) => arr.includes(v));

    if (!skills.includes(skillId) && checker(skills, requiredSkills)) {
      skills.push(skillId);
    } else if (skillId !== 1) {
      skills = skills.filter((item) => item != skillId);
    }

    updatePostData({ ...data, skills });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description, skills, classChoice, id } = postData;
    const req = {
      method: 'PUT',
      headers,

      body: JSON.stringify({
        id,
        title,
        description,
        skills,
        class: classIds[classChoice],
      }),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postData.id}`, req)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  function handleDelete(e) {
    e.preventDefault();
    const { id } = postData;
    const req = {
      method: 'DELETE',
      headers,
      body: {
        id,
      },
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postData.id}`, req).then(
      (res) => {
        if (res.ok) {
          Router.push('/');
        }
      }
    );
  }

  function handleVote(e) {
    const req = {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        upvoted_posts: [...user.upvoted_posts, { id: post.id }],
      }),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, req)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      });
  }

  return isAuthenticated && user.id === post.author.id ? (
    <PostFull
      pageTitle="Edit Build"
      postData={postData}
      classChoice={postData.classChoice}
      classSkills={classSkills}
      handleChange={onChange}
      toggleSkill={toggleSkill}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
    />
  ) : (
    <PostFull
      pageTitle={postData.title}
      postData={postData}
      classSkills={classSkills}
      handleVote={handleVote}
      votes={postData.votes}
    />
  );
};

export async function getServerSideProps({ query, req }) {
  const { id } = query;
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/posts/${id}`);
  const post = await res.json();

  const classSkills = {};
  const classIds = {};
  for (let i = 1; i < 5; i += 1) {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/classes/${i}`);
    const { skill_nodes, title } = await res.json();
    classSkills[title] = skill_nodes;
    classIds[title] = i;
  }

  return {
    props: {
      post,
      classSkills,
      classIds,
    },
  };
}

export default Post;
