import React from 'react';
import SkillNode from '../../components/SkillNode';
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

  // handleDelete(event) {
  //   const token = Cookie.get('jwt');

  //   const req = {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}`, req)
  // }

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

    console.log(req);

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
      <>
        <h1 className="text-3xl mb-5">Create New Post</h1>
        <div className="mb-5">
          <label htmlFor="title">Title: </label>
          <input
            name="title"
            type="text"
            onChange={this.handleChange}
            className="rounded border-2 border-gray-500"
          />
        </div>
        <div className="type-select mb-5">
          <label htmlFor="class">Post type:</label>

          <select
            value={post_type}
            name="post_type"
            id="class"
            onChange={this.handleChange}
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
            name="classChoice"
            id="class"
            onChange={this.handleChange}
            required
          >
            <option value="Devastator">Devastator</option>
            <option value="Pyromancer">Pyromancer</option>
            <option value="Technomancer">Technomancer</option>
            <option value="Trickster">Trickster</option>
          </select>
        </div>

        <section className="skills mb-5 overflow-x-scroll overflow-y-hidden relative">
          <img
            className="max-w-none skills-bg"
            src="/outriders-devastator-skill-tree.jpeg"
          />
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
            onChange={this.handleChange}
            className="w-full rounded border-2 border-gray-500"
          ></textarea>
        </section>

        <button onClick={this.handleSubmit}>Submit</button>
        {/* <button onClick={this.handleDelete}>Delete</button> */}
      </>
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
