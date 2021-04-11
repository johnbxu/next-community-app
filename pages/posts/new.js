import React from 'react';
import Router from 'next/router';
import PostFull from '../../components/PostFull';
import Cookie from 'js-cookie';

class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classChoice: 'Devastator',
      classSkills: props.classSkills,
      title: '',
      skills: [1],
      username: 'test1',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSkill = this.toggleSkill.bind(this);
  }

  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { classChoice } = this.state;
    const { title, description, skills } = this.state;
    const { classIds } = this.props;
    const token = Cookie.get('jwt');

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

  toggleSkill(skillId) {
    const { classChoice, classSkills } = this.state;
    let { skills } = this.state;
    const requiredSkills = classSkills[classChoice].filter(
      (classChoice) => classChoice.node_id === skillId
    )[0].prev_nodes;

    let checker = (arr, target) => target.every((v) => arr.includes(v));

    if (!skills.includes(skillId) && checker(skills, requiredSkills)) {
      skills.push(skillId);
    } else if (skillId !== 1) {
      skills = skills.filter((item) => item != skillId);
    }

    this.setState({ skills });
  }

  render() {
    const { classSkills, classChoice } = this.state;
    return (
      <PostFull
        pageTitle="Create New Build"
        postData={this.state}
        classChoice={classChoice}
        classSkills={classSkills}
        handleChange={this.handleChange}
        toggleSkill={this.toggleSkill}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default New;

export const getServerSideProps = async () => {
  const token = Cookie.get('jwt');
  const classSkills = {};
  const classIds = {};
  for (let i = 1; i < 5; i += 1) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/${i}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { skill_nodes, title } = await res.json();
    classSkills[title] = skill_nodes;
    classIds[title] = i;
  }

  return {
    props: {
      classSkills,
      classIds,
    },
  };
};
