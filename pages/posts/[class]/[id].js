import React, { useContext, useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import Router from 'next/router';
import AppContext from '../../../context/AppContext';
import PostFull from '../../../components/PostFull';

const { NEXT_PUBLIC_API_URL } = process.env;

const Post = ({ post, classSkills, classIds }) => {
  const { user, isAuthenticated, setUser } = useContext(AppContext);
  const [skillPoints, setSkillPoints] = useState(20);
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
    const { classChoice } = postData;
    let { skills } = postData;
    const requiredSkills = classSkills[classChoice].filter(
      (classChoice) => classChoice.node_id === skillId
    )[0].prev_nodes;

    const nextSkills = classSkills[classChoice].filter(
      (classChoice) => classChoice.node_id === skillId
    )[0].next_nodes;

    let checkPrevNodes = (skills, requiredSkills) =>
      requiredSkills.some((requiredSkill) => skills.includes(requiredSkill));

    let checkNextNodes = (skills, nextSkills) =>
      nextSkills.every((nextSkill) => !skills.includes(nextSkill));

    if (skillId !== 1) {
      if (!skills.includes(skillId)) {
        if (checkPrevNodes(skills, requiredSkills)) {
          skills.push(skillId);
          setSkillPoints(skillPoints - 1);
        }
      } else {
        if (checkNextNodes(skills, nextSkills)) {
          const index = skills.indexOf(skillId);
          if (index !== -1) {
            skills.splice(index, 1);
            setSkillPoints(skillPoints + 1);
          }
        }
      }
    }

    updatePostData({ ...postData, skills });
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
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}`);
      })
      .then((res) => res.json())
      .then((data) => {
        postData.votes = data.votes;
        console.log(postData);
        updatePostData(postData);
      });
  }

  return (
    <div className="container px-2 mx-auto">
      {isAuthenticated && user.id === post.author.id ? (
        <PostFull
          pageTitle="Edit Build"
          postData={postData}
          classChoice={postData.classChoice}
          classSkills={classSkills}
          skillPoints={skillPoints}
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
      )}
    </div>
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
