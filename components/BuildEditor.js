import React from 'react';
import Router from 'next/router';
import PostFull from './PostFull';
import Cookies from 'js-cookie';
import useTree from '../hooks/useTree';
import usePostData from '../hooks/usePostData';

const BuildEditor = (props) => {
  
  const {
    tree: skills,
    quantity: skillPoints,
    treeName: classChoice,
    treeNodes: classSkills,
    toggleNode: toggleSkill,
    changeTree,
  } = useTree({
    tree: props.skills.slice(),
    quantity: props.skillPoints,
    treeName: props.classChoice,
    treeNodes: props.classSkills,
    relatedNodeIdString: 'prev_nodes',//added this reference which could be from some global config file
    defaultTree: props.default.skills.slice(),
    defaultQuantity: props.default.skillPoints,
  });

  const { title, description, username, changePostData } = usePostData({
    title: props.title,
    description: props.description,
    username: props.username,
  });
  

  //could consider pulling this out
  const handleSubmit = (e) => {
    e.preventDefault();

    /* no longer needed - handled with original state declaration
    const { classChoice } = this.state;
    const { title, description, skills } = this.state;
    */
    const { classIds } = props;
    const token = Cookies.get('jwt');

    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        title,
        description,
        skills,
        class: classIds[classChoice],
      }),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`, req)
      .then((res) => {
        if (res.ok) {
          alert('Post submitted');
        }
        return res.json();
      })
      .then((data) => {
        Router.push(`/posts/${data.class.title}/${data.id}`);
      })
      .catch((err) => console.log(err));
  }

  const handleChange = (change) => {
    if (change.target.name === 'classChoice') {
      changeTree(change);
    }
    else {
      changePostData(change);
    }
  }
  
  //Not sure what props are needed to be passed in postData but all are assumed
  const postDataFull = {
    skills: skills,
    skillPoints: skillPoints,
    classChoice: classChoice,
    classSkills: classSkills,
    title: title,
    description: description,
    username: username,
  }
  return (
    <div className="container px-2 mx-auto">
      <PostFull
        pageTitle="Create New Build"
        postData={postDataFull}
        classChoice={classChoice}
        classSkills={classSkills}
        skillPoints={skillPoints}
        handleChange={handleChange}
        toggleSkill={toggleSkill}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default BuildEditor;