import HeroItem from "@/app/ui/HeroItem/HeroItem";
import Link from "next/link";
import { fetchHeroesList } from "@/app/lib/data";
import Pagination from "../ui/Pagination/Pagination";
import NotFound from "@/app/ui/NotFound/NotFound";

/**
 * Component that fetches and displays a list of heroes with pagination.
 * @param {Object} props - The component props.
 * @param {Object} [props.searchParams] - The search parameters from the URL.
 * @param {number} [props.searchParams.page=1] - The current page number.
 * @returns {JSX.Element} The rendered heroes list component.
 */
const HeroesList = async ({ searchParams = {} }) => {
  const page = searchParams?.page || 1;
  try {
    const data = await fetchHeroesList(page);

    return (
      <div className="h-[90vh] overflow-auto">
        <ul className="my-4 list-none">
          {data?.results?.map((hero) => {
            return (
              <li className="my-1 first:mt-0 last:mb-0" key={hero.id}>
                <Link href={`heroesList/${hero.id}`}>
                  <HeroItem data={hero} />
                </Link>
              </li>
            );
          })}
        </ul>
        <Pagination
          hasNext={data.next}
          hasPrevious={data.previous}
          totalHeroes={data.count}
        />
      </div>
    );
  } catch {
    return <NotFound />;
  }
};

export default HeroesList;
