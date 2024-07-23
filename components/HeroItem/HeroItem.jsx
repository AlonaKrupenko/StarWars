"use client";

const HeroItem = ({ data }) => {
  return (
    <div className="bg-gray-300 hover:bg-gray-400 rounded p-4 m-1">
      <h4>{data.name}</h4>
    </div>
  );
};

export default HeroItem;
