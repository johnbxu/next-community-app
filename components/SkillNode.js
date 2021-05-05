import React from 'react';

const SkillNode = React.memo(({ skillNode, onClick, active }) => {
  const style = {
    left: skillNode.x,
    top: skillNode.y
  }

  return (
    <div
      className={`rounded-full h-24 w-24 flex items-center justify-center group absolute skill-id-${skillNode.node_id} inset-0 z-1 skill-node type-${skillNode.type} ${active ? 'active' : ''}`}
      onClick={() => onClick(skillNode.node_id)}
      style={style}
    >
      <div className="rounded border-2 border-gray-300 absolute left-10 top-10 group-hover:block hidden z-10 bg-black text-white p-5">
        <h3 className="mb-2">{skillNode.title}</h3>
        <p>{skillNode.description}</p>
      </div>
    </div>
  );
});

export default SkillNode;