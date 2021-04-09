import React, { useContext, useState } from 'react';
import Cookie from 'js-cookie';
import AppContext from '../../../context/AppContext';
import PostFull from '../../../components/PostFull';

const { NEXT_PUBLIC_API_URL } = process.env;

const Post = ({ post, classSkills, classIds }) => {
  const [postData, updatePostData] = useState(post);
  const { user, isAuthenticated } = useContext(AppContext);
  const token = Cookie.get('jwt');
  console.log(postData.class);

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

    const {
      title,
      description,
      skills,
      post_type,
      classChoice,
      id,
    } = postData;

    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        id,
        title,
        description,
        skills,
        post_type,
        class: classIds[classChoice],
      }),
    };

    console.log(req);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postData.id}`, req)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return isAuthenticated && user.id === post.author.id ? (
    <PostFull
      pageTitle="Edit Build"
      postData={postData}
      classSkills={classSkills}
      handleChange={onChange}
      toggleSkill={toggleSkill}
      handleSubmit={handleSubmit}
    />
  ) : (
    <PostFull
      pageTitle={postData.title}
      postData={postData}
      classSkills={classSkills}
    />
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
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
