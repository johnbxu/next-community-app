import React from 'react';
import Router from 'next/router';
import PostFull from '../../components/PostFull';
import Cookies from 'js-cookie';

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
      skillPoints: 20,
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

  toggleSkill(skillId) {
    const { classChoice, classSkills } = this.state;
    let updatedSkills = this.state.skills.slice();
    let updatedSkillPoints = this.state.skillPoints;
    let validChange = true;

    let checkPrevNodes = (skills, requiredSkills) =>
       requiredSkills.some((requiredSkill) => skills.includes(requiredSkill));

    if(skillId!==1){
      if (!updatedSkills.includes(skillId)) {
        updatedSkills.push(skillId);
        updatedSkillPoints--;
      }
      else {
        const skillIndex = updatedSkills.indexOf(skillId);
        if (skillIndex !== -1)
        {
          updatedSkills.splice(skillIndex, 1);
          updatedSkillPoints++;
        }
      }

      //test for valid change
      updatedSkills.forEach(skill => {
        let requiredSkills = classSkills[classChoice].filter(
          (classChoice) => classChoice.node_id === skill
        )[0].prev_nodes;
        if(skill!==1 && !checkPrevNodes(updatedSkills, requiredSkills))
        {
          validChange = false;
        }
      });
      
      if (validChange === true) {
        this.setState({ skills: updatedSkills });
        this.setState({ skillPoints: updatedSkillPoints})
      }
    }
    



    // const requiredSkills = classSkills[classChoice].filter(
    //   (classChoice) => classChoice.node_id === skillId
    // )[0].prev_nodes;

    // const nextSkills = classSkills[classChoice].filter(
    //   (classChoice) => classChoice.node_id === skillId
    // )[0].next_nodes;

    // let checkPrevNodes = (skills, requiredSkills) =>
    //   requiredSkills.some((requiredSkill) => skills.includes(requiredSkill));

    // let checkNextNodes = (skills, nextSkills) =>
    //   nextSkills. every((nextSkill) => !skills.includes(nextSkill));

    // if (skillId !== 1) {
    //   if (!skills.includes(skillId)) {
    //     if (checkPrevNodes(skills, requiredSkills)) {
    //       skills.push(skillId);
    //       this.setState({skillPoints: skillPoints - 1})
    //     }
    //   } else {
    //     if (checkNextNodes(skills, nextSkills)) {
    //       const index = skills.indexOf(skillId);
    //       if (index !== -1) {
    //         skills.splice(index, 1);
    //         this.setState({skillPoints: skillPoints + 1})
    //       }
    //     }
    //   }
    // }






//---------------------------------------------------------------------------------
    // if (!skills.includes(skillId) && checkPrevNodes(skills, requiredSkills)) {
    //   skills.push(skillId);
    // } else if (skillId !== 1) {
    //   skills = skills.filter((item) => item != skillId);
    // }

    // console.log(skills.includes(skillId));
    // console.log(checkNextNodes(skills, nextSkills));
    // console.log(skillId !== 1);

    // if (
    //   skills.includes(skillId) &&
    //   checkNextNodes(skills, nextSkills) &&
    //   skillId !== 1
    // ) {
    //   const index = skills.indexOf(skillId);
    //   if (index !== -1) {
    //     skills.splice(index, 1);
    //   }
    // }
    
  }

  render() {
    const { classSkills, classChoice, skillPoints } = this.state;

    return (
      <div className="container px-2 mx-auto">
        <PostFull
          pageTitle="Create New Build"
          postData={this.state}
          classChoice={classChoice}
          classSkills={classSkills}
          skillPoints={skillPoints}
          handleChange={this.handleChange}
          toggleSkill={this.toggleSkill}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default New;

export const getServerSideProps = async ({ req }) => {
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
