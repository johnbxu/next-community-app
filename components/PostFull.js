import { useContext, useState } from 'react';
import SkillNode from './SkillNode';
import AppContext from '../context/AppContext';

const PostFull = ({
  pageTitle,
  classSkills,
  classChoice,
  postData,
  toggleSkill,
  handleChange,
  handleVote,
  handleSubmit,
  handleDelete
}) => {
  const {
    title,
    post_type,
    description,
    author,
    published_at,
    updated_at,
    votes,
  } = postData;
  const { user } = useContext(AppContext);

  return (
    <>
      <h1 className="text-3xl mb-5">{pageTitle}</h1>
      {pageTitle === 'Create New Build' || pageTitle === 'Edit Build' ? (
        <form>
          <div className="mb-5">
            <label htmlFor="title">Title: </label>
            <input
              name="title"
              type="text"
              value={title}
              onChange={(event) => handleChange(event)}
              className="rounded border-2 border-gray-500"
            />
          </div>
          <div className="type-select mb-5">
            <label htmlFor="post_type">Post type:</label>
            <select
              value={post_type}
              name="post_type"
              id="post_type"
              onChange={(event) => handleChange(event)}
              required
            >
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
            <label htmlFor="description">Description</label>
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

          <button type="button" onClick={(e) => handleSubmit(e)}>Submit</button>
          <button type="button" onClick={(e) => handleDelete(e)}>Delete Post</button>
        </form>
      ) : (
        <>
          <p>Created by: {author.username}</p>
          <p>Published at: {published_at}</p>
          <p>Updated at: {updated_at}</p>
          <p className="my-2">{description}</p>
          <p>Votes: {votes}</p>
          <button onClick={handleVote}>Vote</button>
        </>
      )}
    </>
  );
};

export default PostFull;
