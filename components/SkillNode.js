const SkillNode = ({ skillNode, onClick }) => {
  return (
    <div
      className="rounded-full h-24 w-24 flex items-center justify-center bg-gray-500 hover:shadow-md group relative"
      onClick={() => onClick(skillNode.node_id)}
    >
      <div className="absolute left-0 top-0 hidden group-hover:block">
        <h3>{skillNode.title}</h3>
        <p>{skillNode.description}</p>
      </div>
    </div>
  );
};

export default SkillNode;
