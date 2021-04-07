const SkillNode = ({ skillNode, onClick }) => {
  return (
    <div
      className={`rounded-full h-24 w-24 flex items-center justify-center bg-gray-500 hover:shadow-md group absolute skill-id-${skillNode.node_id}`}
      onClick={() => onClick(skillNode.node_id)}
    >
      <div className="rounded border-2 border-gray-300 absolute left-20 top-10 transition-opacity opacity-0 group-hover:opacity-100 z-10 bg-black text-white p-5">
        <h3 className="mb-2">{skillNode.title}</h3>
        <p>{skillNode.description}</p>
      </div>
    </div>
  );
};

export default SkillNode;
