/**
 * Component that displays an individual hero item.
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data of the hero to be displayed.
 * @param {string} props.data.name - The name of the hero.
 * @returns {JSX.Element} The rendered hero item component.
 */
const HeroItem = ({ data }) => {
  return (
    <div className="bg-gray-300 hover:bg-yellow-200 rounded p-4 transition-all text-m">
      <h4>{data.name}</h4>
    </div>
  );
};

export default HeroItem;
