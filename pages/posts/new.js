import React from 'react';
import PostFull from '../../components/PostFull'
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
      post_type: 'build',
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

    const {
      title,
      description,
      skills,
      username,
      post_type,
      classChoice,
    } = this.state;
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
        post_type,
        class: classIds[classChoice],
      }),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`, req)
      .then((res) => res.json())
      .catch((err) => console.log(err))
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
    const { classSkills, classChoice, post_type, description, title } = this.state;
    return (
      <PostFull
        pageTitle="Create New Build"
        title={title}
        description={description}
        handleChange={this.handleChange}
        classChoice={classChoice}
        classSkills={classSkills}
        post_type={post_type}
        description={description}
        toggleSkill={this.toggleSkill}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default New;

export const getServerSideProps = async () => {
  const classSkills = {};
  const classIds = {};
  for (let i = 1; i < 5; i += 1) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/${i}`);
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
