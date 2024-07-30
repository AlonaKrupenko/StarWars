import "@xyflow/react/dist/style.css";
import { fetchGraphData, fetchHero } from "@/app/lib/data";
import { createGraphData } from "@/app/helpers/prepareGraphData";
import HeroGraph from "@/app/ui/HeroGraph/HeroGraph";
import NotFound from "@/app/ui/NotFound/NotFound";

/**
 * Component that fetches and displays hero details and their related graph data.
 * @param {Object} props - The component props.
 * @param {Object} props.params - The route parameters.
 * @param {number} props.params.heroId - The ID of the hero to fetch.
 * @returns {JSX.Element} The rendered hero page component.
 */
const HeroPage = async ({ params }) => {
  const { heroId } = params;

  try {
    const hero = await fetchHero(heroId);
    const { films, starships } = await fetchGraphData(
      hero.films,
      hero.starships
    );
    const { nodes, edges } = createGraphData(hero, films, starships);

    return (
      <div>
        <div className="flex justify-around items-center flex-wrap gap-4 bg-gray-300 my-4 p-4 rounded">
          <h3 className="text-xl font-bold">{hero.name}</h3>
          <table className="table-auto bg-yellow-200 rounded text-xs">
            <tbody>
              <tr>
                <td className="font-bold px-2 py-1">Hero gender:</td>
                <td className="px-2 py-1">{hero.gender}</td>
                <td className="font-bold px-2 py-1">Hero birth year:</td>
                <td className="px-2 py-1">{hero.birth_year}</td>
              </tr>
              <tr>
                <td className="font-bold px-2 py-1">Hero height:</td>
                <td className="px-2 py-1">{hero.height}</td>
                <td className="font-bold px-2 py-1">Hero mass:</td>
                <td className="px-2 py-1">{hero.mass}</td>
              </tr>
              <tr>
                <td className="font-bold px-2 py-1">Hero skin color:</td>
                <td className="px-2 py-1">{hero.skin_color}</td>
                <td className="font-bold px-2 py-1">Hero hair color:</td>
                <td className="px-2 py-1">{hero.hair_color}</td>
              </tr>
              <tr>
                <td className="font-bold px-2 py-1">Hero eye color:</td>
                <td className="px-2 py-1">{hero.eye_color}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-4">
          <HeroGraph nodes={nodes} edges={edges} />
        </div>
      </div>
    );
  } catch (error) {
    return <NotFound />;
  }
};

export default HeroPage;
