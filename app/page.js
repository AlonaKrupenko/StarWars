import Link from "next/link";

/**
 * Component that displays the home page with an introduction and a link to the heroes list.
 * @returns {JSX.Element} The rendered home page component.
 */
const Home = () => {
  return (
    <>
      <h1 className="text-xl text-center my-4">
        Explore the Star Wars Universe
      </h1>
      <p className="mb-4">
        Navigate to the heroes list page to discover all the characters from the
        Star Wars universe.
      </p>
      <p className="mb-6">
        Click on any hero to view a graph representing the films they appeared
        and the starships they piloted.
      </p>
      <div className="flex items-center justify-center">
        <Link href={`heroesList`} scroll={false}>
          <button className="text-center bg-yellow-300 hover:bg-yellow-400 py-2 px-4 border border-yellow-300 hover:border-yellow-400 rounded">
            Go to heroes list
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
