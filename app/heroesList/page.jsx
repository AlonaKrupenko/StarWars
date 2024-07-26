import HeroItem from "@/app/ui/HeroItem/HeroItem";
import Link from "next/link";
import { fetchHeroesList } from "@/app/lib/data";
import Pagination from "../ui/Pagination/Pagination";

const HeroesList = async ({ searchParams }) => {
  const page = searchParams?.page || 1;
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
};

export default HeroesList;
