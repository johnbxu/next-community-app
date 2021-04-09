import React from 'react';
import SkillNode from './SkillNode';

const PostFull = ({
  pageTitle,
  handleChange,
  classSkills,
  toggleSkill,
  handleSubmit,
  postData,
}) => {
  const {
    title,
    post_type,
    description,
    author,
    published_at,
    updated_at,
  } = postData;
  const classChoice = postData.class.title;

  return (
    <>
      <h1 className="text-3xl mb-5">{pageTitle}</h1>
      {pageTitle === 'Create New Build' || pageTitle === 'Edit Build' ? (
        <>
          <div className="mb-5">
            <label htmlFor="title">Title: </label>
            <input
              name="title"
              type="text"
              onChange={(event) => handleChange(event)}
              className="rounded border-2 border-gray-500"
            />
          </div>
          <div className="type-select mb-5">
            <label htmlFor="class">Post type:</label>

            <select
              value={post_type}
              name="post_type"
              id="class"
              onChange={(event) => handleChange(event)}
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
              id="classChoice"
              onChange={(event) => handleChange(event)}
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
                onClick={(event) => toggleSkill(event)}
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
              onChange={(event) => handleChange(event)}
              className="w-full rounded border-2 border-gray-500"
            ></textarea>
          </section>

          <button onClick={(event) => handleSubmit(event)}>Submit</button>
          {/* <button onClick={this.handleDelete}>Delete</button> */}
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{author.username}</p>
          <p>Type: {post_type}</p>
          <p>Published at: {published_at}</p>
          <p>Updated at: {updated_at}</p>
          <p>{description}</p>
        </>
      )}
    </>
  );
};

export default PostFull;
