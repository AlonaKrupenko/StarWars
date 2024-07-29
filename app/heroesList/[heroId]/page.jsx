import "@xyflow/react/dist/style.css";
import { fetchGraphData, fetchHero } from "@/app/lib/data";
import { createGraphData } from "@/app/helpers/prepareGraphData";
import HeroGraph from "@/app/ui/HeroGraph/HeroGraph";
import NotFound from "@/app/ui/NotFound/NotFound";

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
      <div style={{ height: "100vh", width: "100%" }}>
        <h3 className="text-xl my-4">{`Hero name: ${hero.name}`}</h3>
        <div style={{ height: "80%", width: "100%" }}>
          {<HeroGraph nodes={nodes} edges={edges} />}
        </div>
      </div>
    );
  } catch (error) {
    return <NotFound />;
  }
};

export default HeroPage;
