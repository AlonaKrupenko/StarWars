const HeroItem = ({ data }) => {
  return (
    <div className="bg-gray-300 hover:bg-yellow-200 rounded p-4 transition-all text-m">
      <h4>{data.name}</h4>
    </div>
  );
};

export default HeroItem;
