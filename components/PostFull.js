import { useContext, useState } from 'react';
import SkillNode from './SkillNode';
import SkillTree from './SkillTree';
import AppContext from '../context/AppContext';

const PostFull = ({
  pageTitle,
  classSkills,
  classChoice,
  skillPoints,
  postData,
  toggleSkill,
  handleChange,
  handleVote,
  handleSubmit,
  handleDelete,
}) => {
  const {
    title,
    description,
    author,
    published_at,
    updated_at,
    votes,
  } = postData;
  const { user } = useContext(AppContext);

  return (
    <>
      <h2 className="text-3xl mb-5">{pageTitle}</h2>
      {pageTitle === 'Create New Build' || pageTitle === 'Edit Build' ? (
        <form>
          <div>
            <label htmlFor="title">Title: </label>
            <input
              name="title"
              type="text"
              value={title}
              onChange={(event) => handleChange(event)}
              className="rounded border-2 border-gray-500"
            />
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

          <SkillTree classChoice={classChoice}>
            <div className="skill-points">{skillPoints}</div>
            {classSkills[classChoice].map((skillNode) => (
              <SkillNode
                key={skillNode.id}
                skillNode={skillNode}
                onClick={(event) => toggleSkill(event)}
                active={postData.skills.includes(skillNode.node_id)}
              />
            ))}
          </SkillTree>

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

          <button type="button" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
          {pageTitle === 'Edit Build' ? (
            <button type="button" onClick={(e) => handleDelete(e)}>
              Delete Post
            </button>
          ) : (
            ''
          )}
        </form>
      ) : (
        <>
          <p>Created by: {author.username}</p>
          <p>Published at: {published_at}</p>
          <p>Updated at: {updated_at}</p>
          <SkillTree classChoice={postData.class.title}>
            {classSkills[postData.class.title].map((skillNode) => (
              <SkillNode
                key={skillNode.id}
                skillNode={skillNode}
                active={postData.skills.includes(skillNode.node_id)}
              />
            ))}
          </SkillTree>
          <p className="my-2">{description}</p>
          <p>Votes: {votes}</p>
          <button onClick={handleVote}>Vote</button>
        </>
      )}
    </>
  );
};

export default PostFull;
