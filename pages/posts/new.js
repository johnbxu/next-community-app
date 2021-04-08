import React from 'react';
import SkillNode from '../../components/SkillNode';
import Layout from '../../components/Layout';

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

    this.handleClassChoiceChange = this.handleClassChoiceChange.bind(this);
    this.handlePostTypeChange = this.handlePostTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.toggleSkill = this.toggleSkill.bind(this);
  }

  handleClassChoiceChange(e) {
    this.setState({ classChoice: e.target.value });
  }

  handlePostTypeChange(e) {
    this.setState({ post_type: e.target.value });
  }

  handleTextChange(e) {
    this.setState({ description: e.target.value });
  }
  handleTitleChange(e) {
    this.setState({ title: e.target.value });
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

    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        skills,
        post_type,
        users_permissions_user: 1,
        class: classIds[classChoice],
      }),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`, req)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  setClassChoice(e) {
    console.log(e);
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
    const { classSkills, classChoice, post_type, description } = this.state;
    return (
      <Layout>
        <h1 className="text-3xl mb-5">Create New Post</h1>
        <div className="mb-5">
          <label htmlFor="title">Title: </label>
          <input
            name="title"
            type="text"
            onChange={this.handleTitleChange}
            className="rounded border-2 border-gray-500"
          />
        </div>
        <div className="type-select mb-5">
          <label htmlFor="class">Post type:</label>

          <select
            value={post_type}
            name="class"
            id="class"
            onChange={this.handlePostTypeChange}
            required
          >
            <option value=""></option>
            <option value="post">Post</option>
            <option value="build">Build</option>
          </select>
        </div>

        <div className="class-select mb-5">
          <label htmlFor="class">Class:</label>
          <select
            value={classChoice}
            name="class"
            id="class"
            onChange={this.handleClassChoiceChange}
            required
          >
            <option value="Devastator">Devastator</option>
            <option value="Pyromancer">Pyromancer</option>
            <option value="Technomancer">Technomancer</option>
            <option value="Trickster">Trickster</option>
          </select>
        </div>

        <section className="skills mb-5 overflow-x-scroll overflow-y-hidden relative">
          <img className="max-w-none skills-bg" src="/outriders-devastator-skill-tree.jpeg" />
          {classSkills[classChoice].map((skillNode) => (
            <SkillNode
              key={skillNode.id}
              skillNode={skillNode}
              onClick={this.toggleSkill}
            />
          ))}
        </section>

        <section>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={description}
            onChange={this.handleTextChange}
            className="w-full rounded border-2 border-gray-500"
          ></textarea>
        </section>

        <button onClick={this.handleSubmit}>Submit</button>
      </Layout>
    );
  }
}

export default New;

export const getServerSideProps = async () => {
  const classSkills = {};
  const classIds = {};
  for (let i = 1; i < 5; i += 1) {
    const res = await fetch(`${process.env.API_URL}/classes/${i}`);
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
