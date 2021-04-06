import React from 'react';
import SkillNode from '../../components/SkillNode';

class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classChoice: 'Devastator',
      classSkills: props.classSkills,
      title: '',
      build: [1],
      username: 'test1',
      post_type: '',
      description: '',
    };

    this.handleClassChoiceChange = this.handleClassChoiceChange.bind(this);
    this.handlePostTypeChange = this.handlePostTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSkill = this.toggleSkill.bind(this);
  }

  handleClassChoiceChange(e) {
    this.setState({ classChoice: e.target.value });
  }

  handlePostTypeChange(e) {
    this.setState({ post_type: e.target.value });
  }

  handleSubmit(e) {
    e.preDefault();
  }

  setClassChoice(e) {
    console.log(e);
  }

  toggleSkill(id) {
    const { classChoice, classSkills } = this.state;
    let { build } = this.state;
    const skill = id;
    console.log(skill)
    const requiredSkills = classSkills[classChoice].filter(
      (classChoice) => classChoice.node_id === skill
    )[0].prev_nodes;

    let checker = (arr, target) => target.every((v) => arr.includes(v));

    if (!build.includes(skill) && checker(build, requiredSkills)) {
      build.push(skill);
    } else if (skill !== 1) {
      build = build.filter((item) => item != skill);
    }

    this.setState({ build });
  }

  render() {
    const { classSkills, classChoice, post_type } = this.state;
    return (
      <div>
        <h1 className="mb-5">Create New Post</h1>

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

        <section className="build mb-5">
          {classSkills[classChoice].map((skillNode) => (
            <SkillNode
              key={skillNode.id}
              skillNode={skillNode}
              onClick={this.toggleSkill}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default New;

export const getServerSideProps = async () => {
  const { API_URL } = process.env;
  const classSkills = {};
  for (let i = 1; i < 5; i += 1) {
    const res = await fetch(`${API_URL}/classes/${i}`);
    const { skill_nodes, title } = await res.json();
    classSkills[title] = skill_nodes;
  }

  return {
    props: {
      classSkills,
    },
  };
};
