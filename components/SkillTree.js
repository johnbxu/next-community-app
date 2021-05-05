import React from 'react';

const SkillTree = React.memo(({ classChoice, children }) => {
  return (
    <section className="skills mb-5 overflow-x-scroll overflow-y-hidden relative">
      <img
        className="max-w-none skills-bg"
        src={`/${classChoice.toLowerCase()}_skills.png`}
      />
      {children}
    </section>
  );
});

export default SkillTree;